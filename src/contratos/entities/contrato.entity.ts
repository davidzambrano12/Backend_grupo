import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany
} from 'typeorm';

@Entity()
export class Contrato {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column()
  contractType: string;

  @OneToOne(() => Empleado, Empleado  => Empleado.contract)
  Empleado: Empleado;

  @OneToMany(() => benefi, benefit => benefit.contract, { cascade: true })
  benefits: Benefit[];
}