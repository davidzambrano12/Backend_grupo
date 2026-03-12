import { Cargo } from 'src/cargos/entities/cargo.entity';
import { Contrato } from 'src/contratos/entities/contrato.entity';
import { Departamento } from 'src/departamentos/entities/departamento.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

    @ManyToOne(() => Cargo, cargo => cargo.empleados)
  cargo?: Cargo;


  @ManyToOne(() => Departamento, (departamento) => departamento.empleado)
  departamento?: Departamento;

  @ManyToOne(() => Contrato, (contrato) => contrato.empleados, { cascade: true })
  contrato?: Contrato;
}
