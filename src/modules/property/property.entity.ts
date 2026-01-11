import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Unit } from '../unit/unit.entity';
import { User } from '../users/user.entity';

export enum ListingType {
  SELL = 'SELL',
  RENT = 'RENT',
}

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ListingType,
  })
  listingType: ListingType;

  // (House, Apartment, Room, etc.)
  @Column()
  propertyType: string;

  // HTML Description
  @Column({ type: 'text' })
  description: string;

  // Address
  @Column()
  address: string;

  @Column()
  region: string;

  @Column()
  town: string;

  @Column()
  suburb: string;

  /* Owner */
  @ManyToOne(() => User, (user) => user.ownedProperties)
  owner: User;

  /* Manager */
  @ManyToOne(() => User, (user) => user.managedProperties, { nullable: true })
  manager?: User;

  /* Units */
  @OneToMany(() => Unit, (unit) => unit.property, { cascade: true })
  units: Unit[];

  // TIMESTAMPS
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
