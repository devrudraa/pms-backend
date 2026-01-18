import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import { TenantCreateDTO } from './dto/create-tenant.dto';
import { TenantService } from './tenant.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { JwtPayload } from 'src/jwt/jwt.strategy';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/modules/users/user.entity';
import { RolesGuard } from 'src/jwt/roles.guard';
import { TenantUpdateDTO } from './dto/update-tenant.dto';

@ApiTags('Website Tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TENANT)
  @Post('/create')
  @ApiOperation({
    summary: 'Create tenant profile',
    description:
      'Creates a tenant profile for the currently authenticated user. Only users with TENANT role can access this endpoint.',
  })
  @ApiBody({ type: TenantCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'Tenant profile created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized – JWT missing or invalid',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden – user does not have TENANT role',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict – tenant profile already exists',
  })
  async createTenant(
    @CurrentUser() currentUser: JwtPayload,
    @Body() dto: TenantCreateDTO,
  ) {
    return await this.tenantService.createTenantProfile(currentUser, dto);
  }

  @ApiBearerAuth()
  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update tenant profile',
    description:
      'Updates the tenant profile of the currently authenticated user. Only users with TENANT role can access this endpoint.',
  })
  @ApiBody({ type: TenantUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Tenant profile updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized – JWT missing or invalid',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden – user does not have TENANT role',
  })
  @ApiResponse({
    status: 404,
    description: 'Tenant profile not found',
  })
  async updateTenant(
    @CurrentUser() currentUser: JwtPayload,
    @Body() dto: TenantUpdateDTO,
  ) {
    return await this.tenantService.updateTenantProfile(currentUser, dto);
  }
}
