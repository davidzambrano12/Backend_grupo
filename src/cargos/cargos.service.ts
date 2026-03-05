import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cargo } from './entities/cargo.entity';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';

@Injectable()
export class CargosService {
  constructor(
    @InjectRepository(Cargo)
    private readonly cargoRepo: Repository<Cargo>,
  ) {}

  async create(createCargoDto: CreateCargoDto) {
    const cargo = this.cargoRepo.create(createCargoDto);
    return await this.cargoRepo.save(cargo);
  }

  async findAll() {
    return await this.cargoRepo.find({ relations: ['empleados'] });
  }

  async findOne(id: number) {
    const cargo = await this.cargoRepo.findOne({
      where: { id },
      relations: ['empleados'],
    });
    if (!cargo) {
      throw new NotFoundException('Cargo no encontrado');
    }
    return cargo;
  }

  async update(id: number, updateCargoDto: UpdateCargoDto) {
    const cargo = await this.findOne(id);
    Object.assign(cargo, updateCargoDto);
    return await this.cargoRepo.save(cargo);
  }

  async remove(id: number) {
    const cargo = await this.findOne(id);
    return await this.cargoRepo.remove(cargo);
  }
}
