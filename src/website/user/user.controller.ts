import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import type { JwtPayload } from 'src/jwt/jwt.strategy';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user.dto';

@ApiTags('Website User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get current authenticated user',
    description:
      'Returns information about the currently authenticated user based on the access token.',
  })
  @ApiOkResponse({
    description: 'Authenticated user information retrieved successfully.',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Access token is missing or invalid.',
  })
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() payload: JwtPayload) {
    return this.userService.getUserById(payload.userId);
  }
}
