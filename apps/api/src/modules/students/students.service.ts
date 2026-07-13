import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Gender, ParentRelationship, Prisma, StudentStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { QueryStudentsDto, StudentSortField } from './dto/query-students.dto';
import { StudentParentInputDto } from './dto/student-parent-input.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

const studentListInclude = {
  classroom: {
    select: {
      id: true,
      name: true,
      gradeLevel: true,
      section: true,
      academicYear: true,
    },
  },
} satisfies Prisma.StudentInclude;

const studentDetailInclude = {
  classroom: {
    select: {
      id: true,
      name: true,
      gradeLevel: true,
      section: true,
      academicYear: true,
      roomNumber: true,
    },
  },
  parents: {
    include: {
      parent: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          address: true,
        },
      },
    },
    orderBy: [{ isPrimary: 'desc' as const }, { createdAt: 'asc' as const }],
  },
  createdBy: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  },
  updatedBy: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  },
} satisfies Prisma.StudentInclude;

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(schoolId: string, query: QueryStudentsDto) {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 10;
    const skip = (page - 1) * pageSize;

    const where = this.buildWhereClause(schoolId, query);
    const orderBy = this.buildOrderBy(query.sortBy, query.sortOrder);

    const [students, total] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        where,
        include: studentListInclude,
        orderBy,
        skip,
        take: pageSize,
      }),
      this.prisma.student.count({ where }),
    ]);

    return {
      data: students.map((student) => this.mapStudentListItem(student)),
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  }

  async findOne(schoolId: string, id: string) {
    const student = await this.prisma.student.findFirst({
      where: {
        id,
        schoolId,
        deletedAt: null,
      },
      include: studentDetailInclude,
    });

    if (!student) {
      throw new NotFoundException('Élève introuvable');
    }

    return this.mapStudentDetail(student);
  }

  async create(schoolId: string, userId: string, dto: CreateStudentDto) {
    await this.ensureStudentNumberAvailable(schoolId, dto.studentNumber);

    if (dto.classroomId) {
      await this.ensureClassroomBelongsToSchool(schoolId, dto.classroomId);
    }

    const student = await this.prisma.$transaction(async (tx) => {
      const created = await tx.student.create({
        data: {
          schoolId,
          studentNumber: dto.studentNumber.trim(),
          firstName: dto.firstName.trim(),
          lastName: dto.lastName.trim(),
          dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
          gender: dto.gender ?? null,
          email: dto.email?.trim().toLowerCase() ?? null,
          phone: dto.phone?.trim() ?? null,
          address: dto.address?.trim() ?? null,
          enrollmentDate: dto.enrollmentDate ? new Date(dto.enrollmentDate) : null,
          status: dto.status ?? StudentStatus.ACTIVE,
          classroomId: dto.classroomId ?? null,
          createdById: userId,
          updatedById: userId,
        },
      });

      if (dto.parents?.length) {
        await this.syncParents(tx, schoolId, created.id, dto.parents);
      }

      return tx.student.findFirstOrThrow({
        where: { id: created.id },
        include: studentDetailInclude,
      });
    });

    return this.mapStudentDetail(student);
  }

  async update(schoolId: string, userId: string, id: string, dto: UpdateStudentDto) {
    const existing = await this.prisma.student.findFirst({
      where: { id, schoolId, deletedAt: null },
    });

    if (!existing) {
      throw new NotFoundException('Élève introuvable');
    }

    if (dto.studentNumber && dto.studentNumber !== existing.studentNumber) {
      await this.ensureStudentNumberAvailable(schoolId, dto.studentNumber, id);
    }

    if (dto.classroomId) {
      await this.ensureClassroomBelongsToSchool(schoolId, dto.classroomId);
    }

    const student = await this.prisma.$transaction(async (tx) => {
      await tx.student.update({
        where: { id },
        data: {
          studentNumber: dto.studentNumber?.trim(),
          firstName: dto.firstName?.trim(),
          lastName: dto.lastName?.trim(),
          dateOfBirth:
            dto.dateOfBirth !== undefined
              ? dto.dateOfBirth
                ? new Date(dto.dateOfBirth)
                : null
              : undefined,
          gender: dto.gender,
          email: dto.email !== undefined ? (dto.email?.trim().toLowerCase() ?? null) : undefined,
          phone: dto.phone !== undefined ? (dto.phone?.trim() ?? null) : undefined,
          address: dto.address !== undefined ? (dto.address?.trim() ?? null) : undefined,
          enrollmentDate:
            dto.enrollmentDate !== undefined
              ? dto.enrollmentDate
                ? new Date(dto.enrollmentDate)
                : null
              : undefined,
          status: dto.status,
          classroomId: dto.classroomId === null ? null : dto.classroomId,
          updatedById: userId,
        },
      });

      if (dto.parents) {
        await tx.studentParent.deleteMany({ where: { studentId: id } });
        if (dto.parents.length > 0) {
          await this.syncParents(tx, schoolId, id, dto.parents);
        }
      }

      return tx.student.findFirstOrThrow({
        where: { id },
        include: studentDetailInclude,
      });
    });

    return this.mapStudentDetail(student);
  }

  async remove(schoolId: string, userId: string, id: string) {
    const existing = await this.prisma.student.findFirst({
      where: { id, schoolId, deletedAt: null },
    });

    if (!existing) {
      throw new NotFoundException('Élève introuvable');
    }

    await this.prisma.student.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedById: userId,
      },
    });

    return { success: true };
  }

  async getClassrooms(schoolId: string) {
    const classrooms = await this.prisma.classroom.findMany({
      where: { schoolId, deletedAt: null },
      select: {
        id: true,
        name: true,
        gradeLevel: true,
        section: true,
        academicYear: true,
      },
      orderBy: [{ academicYear: 'desc' }, { gradeLevel: 'asc' }, { name: 'asc' }],
    });

    return { data: classrooms };
  }

  private buildWhereClause(schoolId: string, query: QueryStudentsDto): Prisma.StudentWhereInput {
    const where: Prisma.StudentWhereInput = {
      schoolId,
      deletedAt: null,
    };

    if (query.classroomId) {
      where.classroomId = query.classroomId;
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.gender) {
      where.gender = query.gender;
    }

    if (query.search?.trim()) {
      const search = query.search.trim();
      const parts = search.split(/\s+/).filter(Boolean);

      if (parts.length >= 2) {
        where.OR = [
          { studentNumber: { contains: search, mode: 'insensitive' } },
          {
            AND: [
              { firstName: { contains: parts[0], mode: 'insensitive' } },
              { lastName: { contains: parts.slice(1).join(' '), mode: 'insensitive' } },
            ],
          },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ];
      } else {
        where.OR = [
          { studentNumber: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ];
      }
    }

    return where;
  }

  private buildOrderBy(
    sortBy: StudentSortField = StudentSortField.NAME,
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[] {
    switch (sortBy) {
      case StudentSortField.STUDENT_NUMBER:
        return { studentNumber: sortOrder };
      case StudentSortField.ENROLLMENT_DATE:
        return { enrollmentDate: sortOrder };
      case StudentSortField.NAME:
      default:
        return [{ lastName: sortOrder }, { firstName: sortOrder }];
    }
  }

  private async ensureStudentNumberAvailable(
    schoolId: string,
    studentNumber: string,
    excludeId?: string,
  ) {
    const existing = await this.prisma.student.findFirst({
      where: {
        schoolId,
        studentNumber: studentNumber.trim(),
        deletedAt: null,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('Ce numéro d\'élève est déjà utilisé');
    }
  }

  private async ensureClassroomBelongsToSchool(schoolId: string, classroomId: string) {
    const classroom = await this.prisma.classroom.findFirst({
      where: { id: classroomId, schoolId, deletedAt: null },
      select: { id: true },
    });

    if (!classroom) {
      throw new BadRequestException('Classe invalide pour cet établissement');
    }
  }

  private async syncParents(
    tx: Prisma.TransactionClient,
    schoolId: string,
    studentId: string,
    parents: StudentParentInputDto[],
  ) {
    for (const parentInput of parents) {
      let parentId: string | null = null;

      if (parentInput.email) {
        const existingParent = await tx.parent.findFirst({
          where: {
            schoolId,
            email: parentInput.email.trim().toLowerCase(),
            deletedAt: null,
          },
        });

        if (existingParent) {
          parentId = existingParent.id;
          await tx.parent.update({
            where: { id: existingParent.id },
            data: {
              firstName: parentInput.firstName.trim(),
              lastName: parentInput.lastName.trim(),
              phone: parentInput.phone?.trim() ?? existingParent.phone,
            },
          });
        }
      }

      if (!parentId) {
        const createdParent = await tx.parent.create({
          data: {
            schoolId,
            firstName: parentInput.firstName.trim(),
            lastName: parentInput.lastName.trim(),
            email: parentInput.email?.trim().toLowerCase() ?? null,
            phone: parentInput.phone?.trim() ?? null,
          },
        });
        parentId = createdParent.id;
      }

      await tx.studentParent.create({
        data: {
          studentId,
          parentId,
          relationship: parentInput.relationship,
          isPrimary: parentInput.isPrimary ?? false,
        },
      });
    }
  }

  private mapStudentListItem(
    student: Prisma.StudentGetPayload<{ include: typeof studentListInclude }>,
  ) {
    return {
      id: student.id,
      studentNumber: student.studentNumber,
      firstName: student.firstName,
      lastName: student.lastName,
      fullName: `${student.firstName} ${student.lastName}`,
      gender: student.gender,
      email: student.email,
      phone: student.phone,
      status: student.status,
      enrollmentDate: student.enrollmentDate,
      dateOfBirth: student.dateOfBirth,
      classroom: student.classroom,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }

  private mapStudentDetail(
    student: Prisma.StudentGetPayload<{ include: typeof studentDetailInclude }>,
  ) {
    return {
      ...this.mapStudentListItem(student),
      address: student.address,
      classroom: student.classroom,
      parents: student.parents.map((link) => ({
        id: link.parent.id,
        firstName: link.parent.firstName,
        lastName: link.parent.lastName,
        fullName: `${link.parent.firstName} ${link.parent.lastName}`,
        email: link.parent.email,
        phone: link.parent.phone,
        address: link.parent.address,
        relationship: link.relationship as ParentRelationship,
        isPrimary: link.isPrimary,
      })),
      audit: {
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
        createdBy: student.createdBy
          ? {
              id: student.createdBy.id,
              fullName: `${student.createdBy.firstName} ${student.createdBy.lastName}`,
              email: student.createdBy.email,
            }
          : null,
        updatedBy: student.updatedBy
          ? {
              id: student.updatedBy.id,
              fullName: `${student.updatedBy.firstName} ${student.updatedBy.lastName}`,
              email: student.updatedBy.email,
            }
          : null,
      },
    };
  }
}
