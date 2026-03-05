import { Module } from '@nestjs/common';
import { BeneficiosService } from './beneficios.service';
import { BeneficiosController } from './beneficios.controller';

@Module({
  controllers: [BeneficiosController],
  providers: [BeneficiosService],
})
export class BeneficiosModule {}
