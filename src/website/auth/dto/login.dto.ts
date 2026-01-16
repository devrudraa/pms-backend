import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'jhondoes@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '********' })
  @IsString()
  password: string;
}

export class LoginResDTO {
  @ApiProperty({ example: 'Jhon' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'jhondoes@example.com' })
  email: string;

  @ApiProperty({ example: 'https://example.com/image.webp' })
  image: string;

  @ApiProperty({ description: 'JWT TOKEN' })
  token: string;
}
