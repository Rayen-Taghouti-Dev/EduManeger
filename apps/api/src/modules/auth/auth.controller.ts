import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AppRole } from '../../common/enums/app-role.enum';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import type { RequestUser } from '../../common/interfaces/request-user.interface';
import { LoginDto } from './dto/login.dto';
import { SelectMembershipDto } from './dto/select-membership.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() body: LoginDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(body.email, body.password, this.getRequestMetadata(request));

    if (!result.requiresSelection) {
      response.cookie(
        this.authService.getRefreshCookieName(),
        result.refreshToken,
        this.authService.getRefreshCookieOptions(),
      );
    }

    return result;
  }

  @Post('select-membership')
  @HttpCode(200)
  async selectMembership(
    @Body() body: SelectMembershipDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.selectMembership(
      body.loginToken,
      body.userRoleId,
      this.getRequestMetadata(request),
    );

    response.cookie(
      this.authService.getRefreshCookieName(),
      result.refreshToken,
      this.authService.getRefreshCookieOptions(),
    );

    return result;
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.[this.authService.getRefreshCookieName()];
    const result = await this.authService.refresh(refreshToken, this.getRequestMetadata(request));

    response.cookie(
      this.authService.getRefreshCookieName(),
      result.refreshToken,
      this.authService.getRefreshCookieOptions(),
    );

    return result;
  }

  @Post('logout')
  @HttpCode(200)
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.[this.authService.getRefreshCookieName()];

    await this.authService.logout(refreshToken);
    response.clearCookie(
      this.authService.getRefreshCookieName(),
      this.authService.clearRefreshCookieOptions(),
    );

    return { success: true };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: RequestUser) {
    return this.authService.getCurrentUser(user);
  }

  @Get('rbac-check')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppRole.SUPER_ADMIN, AppRole.SCHOOL_ADMIN)
  rbacCheck(@CurrentUser() user: RequestUser) {
    return { ok: true, user };
  }

  private getRequestMetadata(request: Request) {
    return {
      ipAddress: request.ip,
      userAgent: request.headers['user-agent'] ?? null,
    };
  }
}
