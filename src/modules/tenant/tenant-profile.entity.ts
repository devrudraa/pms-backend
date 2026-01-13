import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('tenant_profiles')
export class TenantProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

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
