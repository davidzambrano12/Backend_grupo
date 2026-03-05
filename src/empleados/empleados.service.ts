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
    const empleado = this.empleadoRepo.create(createEmpleadoDto);
    return await this.empleadoRepo.save(empleado);
  }

 
  async findAll() {
    return await this.empleadoRepo.find({
      relations: ['departamento', 'cargo'],
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

    Object.assign(empleado, updateEmpleadoDto);
    return await this.empleadoRepo.save(empleado);
  }

  
  async remove(id: number) {
    const empleado = await this.findOne(id);
    return await this.empleadoRepo.remove(empleado);
  }


  

 
}