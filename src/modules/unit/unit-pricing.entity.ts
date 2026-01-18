import { Column } from 'typeorm';

export class UnitPricing {
  @Column('decimal')
  rentAmount: number;

  @Column('decimal')
  securityDeposit: number;

  @Column('boolean')
  utilitiesIncluded: boolean;

  @Column()
  utilitiesBreakdown: string;

  @Column({ default: 'N$' })
  currency: string;
}
