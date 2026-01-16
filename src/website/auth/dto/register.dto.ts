import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/modules/users/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'Jho' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'jhondoes@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '********', minLength: 6 })
  @MinLength(6)
  password: string;

  // @ApiProperty({
  //   example: '1990-01-15T00:00:00Z',
  //   description: 'ISO8601 timestamp',
  // })
  // @IsDateString()
  // dob: string;

  @ApiProperty({ example: '+264 811234567' })
  @IsPhoneNumber('NA')
  phoneNumber: string;

  @ApiProperty({ example: 'tenant', enum: UserRole })
  @IsEnum(UserRole, { message: 'Invalid User Role' })
  role: UserRole;
}
