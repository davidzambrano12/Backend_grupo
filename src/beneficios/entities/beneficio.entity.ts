import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';

import { Contrato } from '../../contratos/entities/contrato.entity';

@Entity()
export class Benefit {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Contrato, contrato => contrato.benefits)
  contrato: Contrato;
}