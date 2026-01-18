import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';

//! All the modules imported in this PublicWebsiteModule will have separate docs also
//! And any module which has APIs related to dashboard should not be inside this `public-website` folder
@Module({
  imports: [
    RouterModule.register([
      { path: 'website', module: UserModule },
      { path: 'website', module: TenantModule },
      { path: 'website', module: PropertyModule },
    ]),
    AuthModule,
    UserModule,
    TenantModule,
    PropertyModule,
  ],
})
export class PublicWebsiteModule {}
