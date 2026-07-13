import { Gender, StudentStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { StudentParentInputDto } from './student-parent-input.dto';

export class CreateStudentDto {
  @IsString()
  @MinLength(1)
  studentNumber!: string;

  @IsString()
  @MinLength(1)
  firstName!: string;

  @IsString()
  @MinLength(1)
  lastName!: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsDateString()
  enrollmentDate?: string;

  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;

  @IsOptional()
  @IsString()
  classroomId?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StudentParentInputDto)
  parents?: StudentParentInputDto[];
}
