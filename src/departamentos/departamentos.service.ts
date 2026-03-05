import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from './entities/departamento.entity';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepo: Repository<Departamento>,
  ) {}

  async create(createDepartamentoDto: CreateDepartamentoDto) {
    const departamento = this.departamentoRepo.create(createDepartamentoDto);
    return await this.departamentoRepo.save(departamento);
  }

  async findAll() {
    return await this.departamentoRepo.find({ relations: ['empleado'] });
  }

  async findOne(id: number) {
    const departamento = await this.departamentoRepo.findOne({
      where: { id },
      relations: ['empleado'],
    });
    if (!departamento) {
      throw new NotFoundException('Departamento no encontrado');
    }
    return departamento;
  }

  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    const departamento = await this.findOne(id);
    Object.assign(departamento, updateDepartamentoDto);
    return await this.departamentoRepo.save(departamento);
  }

  async remove(id: number) {
    const departamento = await this.findOne(id);
    return await this.departamentoRepo.remove(departamento);
  }
}
