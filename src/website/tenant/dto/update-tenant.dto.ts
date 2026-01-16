import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export enum EmploymentStatus {
  EMPLOYED = 'EMPLOYED',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  UNEMPLOYED = 'UNEMPLOYED',
}

export class TenantUpdateDTO {
  @ApiPropertyOptional({
    example: 'Jane Doe',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  emergencyContactName?: string;

  @ApiPropertyOptional({
    example: '+91-9998887777',
    description: 'Valid international phone number',
  })
  @IsOptional()
  @IsString()
  emergencyContactNumber?: string;

  @ApiPropertyOptional({
    example: 'XYZ Solutions',
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  employerName?: string;

  @ApiPropertyOptional({
    example: EmploymentStatus.SELF_EMPLOYED,
    enum: EmploymentStatus,
  })
  @IsOptional()
  @IsEnum(EmploymentStatus)
  employmentStatus?: EmploymentStatus;

  @ApiPropertyOptional({
    example: 60000,
    description: 'Monthly income in local currency',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  monthlyIncome?: number;
}
