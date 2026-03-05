import { Cargo } from 'src/cargos/entities/cargo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn
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

    @ManyToOne(() => Cargo, cargo => cargo.employees)
  cargo: Cargo;
}