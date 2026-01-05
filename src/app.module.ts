import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TenantModule } from './modules/tenant/tenant.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
