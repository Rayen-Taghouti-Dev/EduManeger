import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AppRole } from '../../common/enums/app-role.enum';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import type { RequestUser } from '../../common/interfaces/request-user.interface';
import { CreateStudentDto } from './dto/create-student.dto';
import { QueryStudentsDto } from './dto/query-students.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';

const STUDENT_READ_ROLES = [AppRole.SUPER_ADMIN, AppRole.SCHOOL_ADMIN, AppRole.TEACHER] as const;
const STUDENT_WRITE_ROLES = [AppRole.SUPER_ADMIN, AppRole.SCHOOL_ADMIN] as const;

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @Roles(...STUDENT_READ_ROLES)
  findAll(@CurrentUser() user: RequestUser, @Query() query: QueryStudentsDto) {
    return this.studentsService.findAll(user.schoolId, query);
  }

  @Get('classrooms')
  @Roles(...STUDENT_READ_ROLES)
  getClassrooms(@CurrentUser() user: RequestUser) {
    return this.studentsService.getClassrooms(user.schoolId);
  }

  @Get(':id')
  @Roles(...STUDENT_READ_ROLES)
  findOne(@CurrentUser() user: RequestUser, @Param('id') id: string) {
    return this.studentsService.findOne(user.schoolId, id);
  }

  @Post()
  @Roles(...STUDENT_WRITE_ROLES)
  create(@CurrentUser() user: RequestUser, @Body() body: CreateStudentDto) {
    return this.studentsService.create(user.schoolId, user.userId, body);
  }

  @Patch(':id')
  @Roles(...STUDENT_WRITE_ROLES)
  update(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
    @Body() body: UpdateStudentDto,
  ) {
    return this.studentsService.update(user.schoolId, user.userId, id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  @Roles(...STUDENT_WRITE_ROLES)
  remove(@CurrentUser() user: RequestUser, @Param('id') id: string) {
    return this.studentsService.remove(user.schoolId, user.userId, id);
  }
}
