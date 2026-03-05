import { Empleado } from "src/empleados/entities/empleado.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Departamento {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 80})
  name: string;

  @OneToMany(() => Empleado, empleado => empleado.departamento)
  empleado: Empleado[];
}
