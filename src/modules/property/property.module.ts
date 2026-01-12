import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { PropertyController } from './property.controller';
import { PropertyEntity } from './property.entity';
import { PropertyService } from './property.service';
// import { User } from '../users/user.entity';
// import { Unit } from '../unit/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity]), UsersModule],
  providers: [PropertyService],
  controllers: [PropertyController],
})
export class PropertyModule {}
