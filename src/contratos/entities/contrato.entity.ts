import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany
} from 'typeorm';
import { Empleado } from '../../empleados/entities/empleado.entity';
import { Beneficio } from 'src/beneficios/entities/beneficio.entity';

@Entity()
export class Contrato {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column()
  contractType: string;

  @OneToOne(() => Empleado, (empleado)  => empleado.contrato)
  empleado: Empleado;

  @OneToMany(() => Beneficio, (beneficio) => beneficio.contrato, { cascade: true })
beneficios: Beneficio[];
}