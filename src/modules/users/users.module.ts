import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PropertyEntity } from '../property/property.entity';
import { Unit } from '../unit/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PropertyEntity, Unit])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
