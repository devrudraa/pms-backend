// src/modules/tenants/tenant.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantProfile } from './tenant-profile.entity';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([TenantProfile]), UsersModule],
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
