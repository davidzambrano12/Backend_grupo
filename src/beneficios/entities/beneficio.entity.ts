import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';

import { Contrato } from '../../contratos/entities/contrato.entity';

@Entity()
export class Beneficio {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Contrato, contrato => contrato.beneficios)
  contrato: Contrato;
}