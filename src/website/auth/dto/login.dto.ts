import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { UserRole } from 'src/modules/users/user.entity';

export class LoginDto {
  @ApiProperty({ example: 'jhondoes@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '********' })
  @IsString()
  password: string;
}

export class LoginResDTO {
  @ApiProperty({ example: 'UUID' })
  id: string;

  @ApiProperty({ example: 'Jhon' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'jhondoes@example.com' })
  email: string;

  @ApiProperty({ enum: UserRole, example: UserRole.TENANT })
  role: UserRole;

  @ApiProperty({ example: 'https://example.com/image.webp', nullable: true })
  image: string | null;

  @ApiProperty({ description: 'JWT TOKEN' })
  token: string;
}
