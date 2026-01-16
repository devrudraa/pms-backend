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
import { PropertyEntity } from '../property/property.entity';
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

  @Column({ type: 'date' })
  dob: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  // TODO: add these columns
  // ID/Passport Number
  // ID attachment

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
  @OneToMany(() => PropertyEntity, (property) => property.owner)
  ownedProperties: PropertyEntity[];

  /* Properties managed */
  @OneToMany(() => PropertyEntity, (property) => property.manager)
  managedProperties: PropertyEntity[];

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
