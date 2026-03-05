import { Empleado } from 'src/empleados/entities/empleado.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';


@Entity()
export class Cargo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  baseSalary: number;

   @OneToMany(() => Empleado, empleado => empleado.cargo)
  empleados: Empleado[];
}