import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beneficio } from './entities/beneficio.entity';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';

@Injectable()
export class BeneficiosService {
  constructor(
    @InjectRepository(Beneficio)
    private readonly beneficioRepo: Repository<Beneficio>,
  ) {}

  async create(createBeneficioDto: CreateBeneficioDto) {
    const beneficio = this.beneficioRepo.create(createBeneficioDto);
    return await this.beneficioRepo.save(beneficio);
  }

  async findAll() {
    return await this.beneficioRepo.find({ relations: ['contrato'] });
  }

  async findOne(id: number) {
    const beneficio = await this.beneficioRepo.findOne({
      where: { id },
      relations: ['contrato'],
    });
    if (!beneficio) {
      throw new NotFoundException('Beneficio no encontrado');
    }
    return beneficio;
  }

  async update(id: number, updateBeneficioDto: UpdateBeneficioDto) {
    const beneficio = await this.findOne(id);
    Object.assign(beneficio, updateBeneficioDto);
    return await this.beneficioRepo.save(beneficio);
  }

  async remove(id: number) {
    const beneficio = await this.findOne(id);
    return await this.beneficioRepo.remove(beneficio);
  }
}
