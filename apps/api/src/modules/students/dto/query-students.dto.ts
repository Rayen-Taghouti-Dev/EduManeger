import { Gender, StudentStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum StudentSortField {
  NAME = 'name',
  STUDENT_NUMBER = 'studentNumber',
  ENROLLMENT_DATE = 'enrollmentDate',
}

export class QueryStudentsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  classroomId?: string;

  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsEnum(StudentSortField)
  sortBy?: StudentSortField = StudentSortField.NAME;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number = 10;
}
