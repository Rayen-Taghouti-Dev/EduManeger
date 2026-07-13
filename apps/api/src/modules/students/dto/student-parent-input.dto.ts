import { ParentRelationship } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class StudentParentInputDto {
  @IsString()
  @MinLength(1)
  firstName!: string;

  @IsString()
  @MinLength(1)
  lastName!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEnum(ParentRelationship)
  relationship!: ParentRelationship;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}
