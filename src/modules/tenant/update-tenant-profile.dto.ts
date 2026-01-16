import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateTenantProfileDto {
  @ApiProperty({ example: 'Teacher' })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiProperty({ example: '+264 811234567' })
  @IsOptional()
  @IsPhoneNumber('NA')
  emergencyContact?: string;
}
