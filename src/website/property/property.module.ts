import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/modules/property/property.entity';
import { Unit } from 'src/modules/unit/unit.entity';
import { UserEntity } from 'src/modules/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity, Unit, UserEntity])],
  providers: [PropertyService],
  controllers: [PropertyController],
})
export class PropertyModule {}
