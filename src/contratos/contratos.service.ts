import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contrato } from './entities/contrato.entity';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Injectable()
export class ContratosService {
  constructor(
    @InjectRepository(Contrato)
    private readonly contratoRepo: Repository<Contrato>,
  ) {}

  async create(createContratoDto: CreateContratoDto) {
    const contrato = this.contratoRepo.create(createContratoDto);
    return await this.contratoRepo.save(contrato);
  }

  async findAll() {
    return await this.contratoRepo.find({ relations: ['empleado', 'beneficios'] });
  }

  async findOne(id: number) {
    const contrato = await this.contratoRepo.findOne({
      where: { id },
      relations: ['empleado', 'beneficios'],
    });
    if (!contrato) {
      throw new NotFoundException('Contrato no encontrado');
    }
    return contrato;
  }

  async update(id: number, updateContratoDto: UpdateContratoDto) {
    const contrato = await this.findOne(id);
    Object.assign(contrato, updateContratoDto);
    return await this.contratoRepo.save(contrato);
  }

  async remove(id: number) {
    const contrato = await this.findOne(id);
    return await this.contratoRepo.remove(contrato);
  }
}
