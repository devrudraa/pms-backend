import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from '../property/property.entity';
import { User } from '../users/user.entity';
import { UnitPricing } from './unit-pricing.entity';

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  unitName: string; // e.g. A-101, Flat 2B

  // @Column()
  // floor: number;

  @Column()
  sizeSqFt: number;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column('boolean')
  petFriendly: boolean;

  @Column('boolean')
  parkingSpace: boolean;

  @Column('boolean')
  furnished: boolean;

  @Column('boolean', { default: true })
  available: boolean;

  /* Embedded Pricing */
  @Column(() => UnitPricing)
  pricing: UnitPricing;

  /* Property */
  @ManyToOne(() => Property, (property) => property.units)
  property: Property;

  /* Tenant */
  @OneToOne(() => User, { nullable: true })
  @JoinColumn()
  tenant?: User;
}
