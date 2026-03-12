import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepo: Repository<Empleado>,
  ) {}

 
  async create(createEmpleadoDto: CreateEmpleadoDto) {
    console.log(createEmpleadoDto);
    
    const { cargoId, departamentoId, contratoId, ...rest } = createEmpleadoDto;
    const empleado = this.empleadoRepo.create({
      ...rest,
      cargo: { id: cargoId },
      departamento: { id: departamentoId },
      contrato: { id: contratoId },   
    });
    return await this.empleadoRepo.save(empleado);
  }

  async searchByName(name: string) {
    return await this.empleadoRepo.find({
      where: { firstName: name },
    });
  }
 
  async findAll() {
    return await this.empleadoRepo.find({
      relations: ['departamento', 'cargo', 'contrato'],
    });
  }

 
  async findOne(id: number) {
    const empleado = await this.empleadoRepo.findOne({
      where: { id },
      relations: ['departamento', 'cargo', 'contrato', 'contrato.beneficios'],
    });

    if (!empleado) {
      throw new NotFoundException('Empleado no encontrado');
    }

    return empleado;
  }

 
  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    const empleado = await this.findOne(id);
    const { cargoId, departamentoId, contratoId, ...rest } = updateEmpleadoDto;

    Object.assign(empleado, rest);
    if (cargoId) empleado.cargo = { id: cargoId } as any;
    if (departamentoId) empleado.departamento = { id: departamentoId } as any;
    if (contratoId) empleado.contrato = { id: contratoId } as any;

    return await this.empleadoRepo.save(empleado);
  }

  
  async remove(id: number) {
    const empleado = await this.findOne(id);
    return await this.empleadoRepo.remove(empleado);
  }

  calcularSalarioNeto(empleado: Empleado): number {
    const salarioBase = Number(empleado.cargo?.baseSalary) || 0;
    const totalBeneficios = (empleado.contrato?.beneficios ?? []).reduce(
      (sum, b) => sum + Number(b.amount),
      0,
    );
    return salarioBase + totalBeneficios;
  }

  async getDetalleCompleto(id: number) {
    const empleado = await this.findOne(id);
    const salarioNeto = this.calcularSalarioNeto(empleado);

    return {
      id: empleado.id,
      firstName: empleado.firstName,
      lastName: empleado.lastName,
      email: empleado.email,
      departamento: empleado.departamento,
      cargo: empleado.cargo,
      contrato: {
        id: empleado.contrato?.id,
        startDate: empleado.contrato?.startDate,
        contractType: empleado.contrato?.contractType,
        beneficios: empleado.contrato?.beneficios ?? [],
      },
      salarioBase: Number(empleado.cargo?.baseSalary) || 0,
      totalBeneficios: (empleado.contrato?.beneficios ?? []).reduce(
        (sum, b) => sum + Number(b.amount),
        0,
      ),
      salarioNeto,
    };
  }
}