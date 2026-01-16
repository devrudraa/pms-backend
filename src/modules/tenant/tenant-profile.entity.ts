import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('tenant_profiles')
export class TenantProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @Column()
  employmentStatus: string;

  @Column()
  employerName: string;

  @Column({ type: 'varchar', nullable: true })
  monthlyIncome: string | null;

  @Column()
  emergencyContactName: string;

  @Column()
  emergencyContactNumber: string;
}
