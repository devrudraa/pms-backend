import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginResDTO } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOkResponse({
    example: 'User created successfully',
  })
  @ApiConflictResponse({
    example: 'User with email already exist',
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOkResponse({
    type: LoginResDTO,
  })
  @ApiBadRequestResponse({
    example: 'Email or password is invalid',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
