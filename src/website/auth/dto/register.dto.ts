import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
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

  // Just checking if the phone number is string or not
  // Because it is not mandatory right now
  // If you want to check if it is a actual phone number
  // use IsPhoneNumber
  @ApiProperty({ example: '+264 811234567' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'tenant', enum: UserRole })
  @IsEnum(UserRole, { message: 'Invalid User Role' })
  role: UserRole;
}
