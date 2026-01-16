import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantProfile } from 'src/modules/tenant/tenant-profile.entity';
import { Repository } from 'typeorm';
import { TenantCreateDTO } from './dto/create-tenant.dto';
import { JwtPayload } from 'src/jwt/jwt.strategy';
import { UserService } from '../user/user.service';
import { UserRole } from 'src/modules/users/user.entity';
import { TenantUpdateDTO } from './dto/update-tenant.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantProfile)
    private readonly tenantRepository: Repository<TenantProfile>,
    private readonly userService: UserService,
  ) {}

  async createTenantProfile(currentUser: JwtPayload, dto: TenantCreateDTO) {
    const user = await this.userService.getUserById(currentUser.userId);

    if (user.role !== UserRole.TENANT) {
      throw new ForbiddenException(
        'Only users with TENANT role can create a tenant profile',
      );
    }

    const existingTenant = await this.tenantRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (existingTenant) {
      throw new ConflictException('Tenant profile already exists');
    }

    const tenant = this.tenantRepository.create({
      emergencyContactName: dto.emergencyContactName,
      emergencyContactNumber: dto.emergencyContactNumber,
      employerName: dto.employerName,
      employmentStatus: dto.employmentStatus,
      monthlyIncome: dto.monthlyIncome,
      user: user,
    });

    return await this.tenantRepository.save(tenant);
  }

  async updateTenantProfile(currentUser: JwtPayload, dto: TenantUpdateDTO) {
    const user = await this.userService.getUserById(currentUser.userId);

    if (user.role !== UserRole.TENANT) {
      throw new ForbiddenException('Only tenants can update their profile');
    }

    const tenant = await this.tenantRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!tenant) {
      throw new NotFoundException('Tenant profile not found');
    }

    Object.assign(tenant, dto);

    return await this.tenantRepository.save(tenant);
  }
}
