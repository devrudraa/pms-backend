import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TenantCreateDTO {
  @ApiProperty({
    example: 'Teacher',
    type: 'string',
  })
  @IsString()
  employmentStatus: string;

  @ApiProperty({
    example: 'Company Name',
    type: 'string',
  })
  @IsString()
  employerName: string;

  @ApiProperty({
    description: 'Income in N$',
    example: '200',
    nullable: true,
    type: 'string',
  })
  @IsOptional()
  @IsString()
  monthlyIncome: string | null;

  @ApiProperty({
    example: 'Jhon Doe',
    type: 'string',
  })
  @IsString()
  emergencyContactName: string;

  @ApiProperty({
    type: 'string',
    example: '+264 811234567',
  })
  @IsString()
  emergencyContactNumber: string;
}
