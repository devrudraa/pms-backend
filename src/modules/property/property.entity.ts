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
import { UserEntity } from '../users/user.entity';

export enum ListingType {
  SELL = 'SELL',
  RENT = 'RENT',
}

export enum PropertyStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
}

@Entity('properties')
export class PropertyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /* ===== REQUIRED AT CREATION ===== */

  @Column({ length: 120 })
  name: string;

  @Column({
    type: 'enum',
    enum: ListingType,
  })
  listingType: ListingType;

  @ManyToOne(() => UserEntity, (user) => user.ownedProperties, {
    nullable: false,
  })
  owner: UserEntity;

  @Column({
    type: 'enum',
    enum: PropertyStatus,
    default: PropertyStatus.DRAFT,
  })
  status: PropertyStatus;

  /* ===== OPTIONAL (DRAFT SAFE) ===== */

  // (House, Apartment, Room, etc.)
  @Column({ nullable: true })
  propertyType?: string;

  // HTML Description
  @Column({ type: 'text', nullable: true })
  description?: string;

  // Address
  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  region?: string;

  @Column({ nullable: true })
  town?: string;

  @Column({ nullable: true })
  suburb?: string;

  /* Manager */
  @ManyToOne(() => UserEntity, (user) => user.managedProperties, {
    nullable: true,
  })
  manager: UserEntity | null;

  /* Units */
  @OneToMany(() => Unit, (unit) => unit.property, {
    cascade: false,
    nullable: true,
  })
  units?: Unit[];

  /* ===== TIMESTAMPS ===== */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
