import { Injectable } from '@nestjs/common';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';

@Injectable()
export class BeneficiosService {
  create(createBeneficioDto: CreateBeneficioDto) {
    return 'This action adds a new beneficio';
  }

  findAll() {
    return `This action returns all beneficios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} beneficio`;
  }

  update(id: number, updateBeneficioDto: UpdateBeneficioDto) {
    return `This action updates a #${id} beneficio`;
  }

  remove(id: number) {
    return `This action removes a #${id} beneficio`;
  }
}
