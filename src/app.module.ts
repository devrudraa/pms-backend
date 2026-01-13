import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './modules/property/property.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { UnitModule } from './modules/unit/unit.module';
import { AuthModule } from './website/auth/auth.module';
import { PublicWebsiteModule } from './website/public.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // use "postgres" if running inside Docker
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'pms-dev',
      autoLoadEntities: true,
      synchronize: true, // IMPORTANT: keep false in real projects
    }),
    PublicWebsiteModule,
    AuthModule,
    TenantModule,
    PropertyModule,
    UnitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
