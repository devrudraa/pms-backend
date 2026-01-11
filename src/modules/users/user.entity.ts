import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Property } from '../property/property.entity';
import { Unit } from '../unit/unit.entity';

export enum UserRole {
  LANDLORD = 'landlord',
  TENANT = 'tenant',
  AGENT = 'agent',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TENANT,
  })
  role: UserRole;

  // By Default false, once the user has completed onboarding and
  // Admin has verified make it true!
  @Column({ default: false })
  isVerified: boolean;

  /* Properties owned */
  @OneToMany(() => Property, (property) => property.owner)
  ownedProperties: Property[];

  /* Properties managed */
  @OneToMany(() => Property, (property) => property.manager)
  managedProperties: Property[];

  /* Unit occupied as tenant */
  @OneToOne(() => Unit, (unit) => unit.tenant)
  rentedUnit: Unit;

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
