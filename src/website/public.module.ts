import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

//! All the modules imported in this PublicWebsiteModule will have separate docs also
//! And any module which has APIs related to dashboard should not be inside this `public-website` folder
@Module({
  imports: [AuthModule, UserModule],
})
export class PublicWebsiteModule {}
