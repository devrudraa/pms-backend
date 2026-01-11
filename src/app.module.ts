import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PropertyModule } from './modules/property/property.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { UnitModule } from './modules/unit/unit.module';
import { UsersModule } from './modules/users/users.module';

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
    UsersModule,
    AuthModule,
    TenantModule,
    PropertyModule,
    UnitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
