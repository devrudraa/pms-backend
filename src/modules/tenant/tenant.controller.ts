import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import { UpdateTenantProfileDto } from './update-tenant-profile.dto';
import type { JwtPayload } from 'src/jwt/jwt.strategy';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RolesGuard } from 'src/jwt/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@ApiTags('Tenant')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.TENANT)
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get('profile')
  async getProfile(@CurrentUser() user: JwtPayload) {
    console.log('USER: ', user);
    const data = await this.tenantService.getTenantProfile(user.email);

    console.log('DTAT: ', data);
    return data;
  }

  @Put('profile')
  updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateTenantProfileDto,
  ) {
    return this.tenantService.upsertTenantProfile(user.email, dto);
  }
}
