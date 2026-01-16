import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './modules/property/property.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { UnitModule } from './modules/unit/unit.module';
import { AuthModule } from './website/auth/auth.module';
import { PublicWebsiteModule } from './website/public.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,

        // VERY IMPORTANT
        synchronize: config.get('NODE_ENV') !== 'production',
      }),
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
