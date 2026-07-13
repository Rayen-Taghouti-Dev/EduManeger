import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { AuthSession, Prisma, School, User, UserRole } from '@prisma/client';
import { SchoolStatus, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { createHash, randomBytes, randomUUID } from 'crypto';

import { AppRole } from '../../common/enums/app-role.enum';
import type { RequestUser } from '../../common/interfaces/request-user.interface';
import { PrismaService } from '../../prisma/prisma.service';
import {
  AUTH_ACCESS_TOKEN_PURPOSE,
  AUTH_LOGIN_SELECTION_PURPOSE,
  AUTH_REFRESH_COOKIE_NAME,
} from './auth.constants';
import type { AuthenticatedUser, AuthMembershipOption } from './types/authenticated-user.type';
import type { AccessJwtPayload, LoginSelectionJwtPayload } from './types/jwt-payload.type';

type MembershipRecord = Prisma.UserRoleGetPayload<{
  include: {
    role: true;
    school: true;
  };
}>;

type SessionRecord = Prisma.AuthSessionGetPayload<{
  include: {
    user: true;
    school: true;
    userRole: {
      include: {
        role: true;
        school: true;
      };
    };
  };
}>;

interface RequestMetadata {
  ipAddress?: string | null;
  userAgent?: string | null;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string, metadata: RequestMetadata) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        roles: {
          include: {
            role: true,
            school: true,
          },
        },
      },
    });

    if (!user || user.deletedAt || user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const memberships = user.roles.filter((membership) => this.isActiveMembership(membership));
    if (memberships.length === 0) {
      throw new ForbiddenException('Aucune appartenance active à un établissement');
    }

    if (memberships.length === 1) {
      const auth = await this.createAuthenticatedSession(user, memberships[0]!, metadata);

      return {
        requiresSelection: false as const,
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        user: auth.user,
      };
    }

    const loginToken = await this.jwtService.signAsync<LoginSelectionJwtPayload>(
      {
        sub: user.id,
        userId: user.id,
        allowedUserRoleIds: memberships.map((membership) => membership.id),
        purpose: AUTH_LOGIN_SELECTION_PURPOSE,
      },
      {
        secret: this.getAccessTokenSecret(),
        expiresIn: '5m',
      },
    );

    return {
      requiresSelection: true as const,
      loginToken,
      memberships: memberships.map((membership) => this.serializeMembership(membership)),
    };
  }

  async selectMembership(loginToken: string, userRoleId: string, metadata: RequestMetadata) {
    let payload: LoginSelectionJwtPayload;

    try {
      payload = await this.jwtService.verifyAsync<LoginSelectionJwtPayload>(loginToken, {
        secret: this.getAccessTokenSecret(),
      });
    } catch {
      throw new UnauthorizedException('Jeton de sélection invalide');
    }

    if (payload.purpose !== AUTH_LOGIN_SELECTION_PURPOSE) {
      throw new UnauthorizedException('Jeton de sélection invalide');
    }

    if (!payload.allowedUserRoleIds.includes(userRoleId)) {
      throw new ForbiddenException('Cette appartenance ne peut pas être sélectionnée');
    }

    const membership = await this.prisma.userRole.findUnique({
      where: { id: userRoleId },
      include: {
        role: true,
        school: true,
        user: true,
      },
    });

    if (!membership || membership.userId !== payload.userId || !this.isActiveMembership(membership)) {
      throw new UnauthorizedException('Appartenance invalide');
    }

    const auth = await this.createAuthenticatedSession(membership.user, membership, metadata);

    return {
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
      user: auth.user,
    };
  }

  async refresh(refreshToken: string | undefined, metadata: RequestMetadata) {
    if (!refreshToken) {
      throw new UnauthorizedException('Session invalide');
    }

    const session = await this.findSessionByRefreshToken(refreshToken);

    if (!session) {
      throw new UnauthorizedException('Session invalide');
    }

    if (session.revokedAt) {
      await this.revokeSessionFamily(session.tokenFamily, 'REPLAY_DETECTED');
      throw new UnauthorizedException('Session révoquée');
    }

    if (session.expiresAt.getTime() <= Date.now()) {
      await this.revokeSessionById(session.id, 'EXPIRED');
      throw new UnauthorizedException('Session expirée');
    }

    if (!this.isActiveMembership(session.userRole) || session.user.deletedAt || session.user.status !== UserStatus.ACTIVE) {
      await this.revokeSessionById(session.id, 'MEMBERSHIP_INACTIVE');
      throw new UnauthorizedException('Appartenance inactive');
    }

    const auth = await this.rotateAuthenticatedSession(session, metadata);

    return {
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
      user: auth.user,
    };
  }

  async logout(refreshToken?: string) {
    if (!refreshToken) {
      return;
    }

    const session = await this.findSessionByRefreshToken(refreshToken);
    if (!session || session.revokedAt) {
      return;
    }

    await this.revokeSessionById(session.id, 'LOGOUT');
  }

  async getCurrentUser(requestUser: RequestUser): Promise<AuthenticatedUser> {
    const membership = await this.prisma.userRole.findUnique({
      where: { id: requestUser.userRoleId },
      include: {
        role: true,
        school: true,
        user: true,
      },
    });

    if (!membership || membership.userId !== requestUser.userId || !this.isActiveMembership(membership)) {
      throw new UnauthorizedException('Session invalide');
    }

    return this.buildAuthenticatedUser(membership.user, membership);
  }

  getRefreshCookieName() {
    return this.configService.get<string>('AUTH_REFRESH_COOKIE_NAME') ?? AUTH_REFRESH_COOKIE_NAME;
  }

  getRefreshCookieOptions() {
    return {
      httpOnly: true,
      sameSite: this.getCookieSameSite(),
      secure: this.getCookieSecure(),
      path: '/api/v1/auth',
      maxAge: this.parseDurationToMs(this.getRefreshTokenExpiration()),
    } as const;
  }

  clearRefreshCookieOptions() {
    return {
      httpOnly: true,
      sameSite: this.getCookieSameSite(),
      secure: this.getCookieSecure(),
      path: '/api/v1/auth',
    } as const;
  }

  private async createAuthenticatedSession(
    user: User,
    membership: MembershipRecord,
    metadata: RequestMetadata,
  ) {
    const refreshToken = this.generateRefreshToken();
    const tokenFamily = randomUUID();
    const expiresAt = new Date(Date.now() + this.parseDurationToMs(this.getRefreshTokenExpiration()));

    const session = await this.prisma.$transaction(async (tx) => {
      const createdSession = await tx.authSession.create({
        data: {
          userId: user.id,
          schoolId: membership.schoolId,
          userRoleId: membership.id,
          refreshTokenHash: this.hashRefreshToken(refreshToken),
          tokenFamily,
          expiresAt,
          ipAddress: metadata.ipAddress ?? null,
          userAgent: metadata.userAgent ?? null,
        },
      });

      await tx.user.update({
        where: { id: user.id },
        data: {
          lastLoginAt: new Date(),
        },
      });

      return createdSession;
    });

    return {
      accessToken: await this.signAccessToken(user, membership, session.id),
      refreshToken,
      user: this.buildAuthenticatedUser(user, membership),
    };
  }

  private async rotateAuthenticatedSession(session: SessionRecord, metadata: RequestMetadata) {
    const refreshToken = this.generateRefreshToken();
    const expiresAt = new Date(Date.now() + this.parseDurationToMs(this.getRefreshTokenExpiration()));

    const newSession = await this.prisma.$transaction(async (tx) => {
      await tx.authSession.update({
        where: { id: session.id },
        data: {
          revokedAt: new Date(),
          revokedReason: 'ROTATED',
          lastUsedAt: new Date(),
        },
      });

      return tx.authSession.create({
        data: {
          userId: session.userId,
          schoolId: session.schoolId,
          userRoleId: session.userRoleId,
          refreshTokenHash: this.hashRefreshToken(refreshToken),
          tokenFamily: session.tokenFamily,
          rotatedFromId: session.id,
          expiresAt,
          ipAddress: metadata.ipAddress ?? null,
          userAgent: metadata.userAgent ?? null,
        },
      });
    });

    return {
      accessToken: await this.signAccessToken(session.user, session.userRole, newSession.id),
      refreshToken,
      user: this.buildAuthenticatedUser(session.user, session.userRole),
    };
  }

  private async findSessionByRefreshToken(refreshToken: string) {
    return this.prisma.authSession.findFirst({
      where: { refreshTokenHash: this.hashRefreshToken(refreshToken) },
      include: {
        user: true,
        school: true,
        userRole: {
          include: {
            role: true,
            school: true,
          },
        },
      },
    });
  }

  private async revokeSessionById(sessionId: string, reason: string) {
    await this.prisma.authSession.updateMany({
      where: {
        id: sessionId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
        revokedReason: reason,
      },
    });
  }

  private async revokeSessionFamily(tokenFamily: string, reason: string) {
    await this.prisma.authSession.updateMany({
      where: {
        tokenFamily,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
        revokedReason: reason,
      },
    });
  }

  private async signAccessToken(user: User, membership: MembershipRecord, sessionId: string) {
    const role = this.normalizeRole(membership.role.slug);
    if (!role) {
      throw new BadRequestException(`Rôle non pris en charge: ${membership.role.slug}`);
    }

    const payload: AccessJwtPayload = {
      sub: user.id,
      userId: user.id,
      schoolId: membership.schoolId,
      role,
      roleId: membership.roleId,
      userRoleId: membership.id,
      sessionId,
      purpose: AUTH_ACCESS_TOKEN_PURPOSE,
    };

    return this.jwtService.signAsync(payload);
  }

  private buildAuthenticatedUser(user: User, membership: MembershipRecord): AuthenticatedUser {
    const role = this.normalizeRole(membership.role.slug);
    if (!role) {
      throw new BadRequestException(`Rôle non pris en charge: ${membership.role.slug}`);
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      avatarUrl: user.avatarUrl ?? null,
      role,
      roleId: membership.roleId,
      userRoleId: membership.id,
      school: {
        id: membership.school.id,
        name: membership.school.name,
        slug: membership.school.slug,
        plan: membership.school.plan,
        status: membership.school.status,
      },
    };
  }

  private serializeMembership(membership: MembershipRecord): AuthMembershipOption {
    const role = this.normalizeRole(membership.role.slug);
    if (!role) {
      throw new BadRequestException(`Rôle non pris en charge: ${membership.role.slug}`);
    }

    return {
      userRoleId: membership.id,
      schoolId: membership.schoolId,
      schoolName: membership.school.name,
      schoolSlug: membership.school.slug,
      role,
      roleId: membership.roleId,
      roleName: membership.role.name,
    };
  }

  private isActiveMembership(
    membership: UserRole & {
      role: { slug: string; deletedAt: Date | null };
      school: School;
      user?: User;
    },
  ) {
    return (
      membership.role.deletedAt === null &&
      membership.school.deletedAt === null &&
      membership.school.status === SchoolStatus.ACTIVE
    );
  }

  private normalizeRole(slug: string): AppRole | null {
    const normalizedSlug = slug.trim().toUpperCase();

    switch (normalizedSlug) {
      case AppRole.SUPER_ADMIN:
      case AppRole.SCHOOL_ADMIN:
      case AppRole.TEACHER:
      case AppRole.ACCOUNTANT:
      case AppRole.PARENT:
      case AppRole.STUDENT:
        return normalizedSlug;
      default:
        return null;
    }
  }

  private hashRefreshToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }

  private generateRefreshToken() {
    return randomBytes(48).toString('hex');
  }

  private getAccessTokenSecret() {
    return this.configService.get<string>('JWT_ACCESS_SECRET') ?? 'change-me-access-secret';
  }

  private getRefreshTokenExpiration() {
    return this.configService.get<string>('JWT_REFRESH_EXPIRATION') ?? '7d';
  }

  private getCookieSecure() {
    return (this.configService.get<string>('AUTH_COOKIE_SECURE') ?? 'false').toLowerCase() === 'true';
  }

  private getCookieSameSite(): 'lax' | 'strict' | 'none' {
    const value = (this.configService.get<string>('AUTH_COOKIE_SAME_SITE') ?? 'lax').toLowerCase();

    if (value === 'strict' || value === 'none') {
      return value;
    }

    return 'lax';
  }

  private parseDurationToMs(value: string) {
    const match = /^(\d+)(ms|s|m|h|d)?$/i.exec(value.trim());
    if (!match) {
      throw new BadRequestException(`Durée invalide: ${value}`);
    }

    const amount = Number(match[1]);
    const unit = (match[2] ?? 'ms').toLowerCase();

    switch (unit) {
      case 'ms':
        return amount;
      case 's':
        return amount * 1000;
      case 'm':
        return amount * 60 * 1000;
      case 'h':
        return amount * 60 * 60 * 1000;
      case 'd':
        return amount * 24 * 60 * 60 * 1000;
      default:
        throw new BadRequestException(`Unité de durée invalide: ${value}`);
    }
  }
}
