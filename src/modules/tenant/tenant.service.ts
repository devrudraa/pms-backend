// src/modules/tenants/tenant.service.ts

import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantProfile } from './tenant-profile.entity';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user.entity';
import { UpdateTenantProfileDto } from './update-tenant-profile.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantProfile)
    private readonly tenantRepo: Repository<TenantProfile>,
    private readonly usersService: UsersService,
  ) {}

  async upsertTenantProfile(userEmail: string, dto: UpdateTenantProfileDto) {
    const user = await this.usersService.findByEmail(userEmail);

    if (!user || user.role !== UserRole.TENANT) {
      throw new ForbiddenException('User is not a tenant');
    }

    let profile = await this.tenantRepo.findOne({
      where: { user: { id: user.id } },
      relations: ['user'],
    });

    if (!profile) {
      profile = this.tenantRepo.create({
        user,
        ...dto,
      });
    } else {
      Object.assign(profile, dto);
    }

    return this.tenantRepo.save(profile);
  }

  async getTenantProfile(email: string) {
    return this.tenantRepo.findOneOrFail({
      where: { user: { email: email } },
    });
  }
}
