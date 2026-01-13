import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantProfile } from 'src/modules/tenant/tenant-profile.entity';
import { UserModule } from '../user/user.module';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';

@Module({
  imports: [TypeOrmModule.forFeature([TenantProfile]), UserModule],
  providers: [TenantService],
  controllers: [TenantController],
})
export class TenantModule {}
