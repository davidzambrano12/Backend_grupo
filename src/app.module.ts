import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { CargosModule } from './cargos/cargos.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { ContratosModule } from './contratos/contratos.module';
import { BeneficiosModule } from './beneficios/beneficios.module';

@Module({
  imports: [DepartamentosModule, CargosModule, EmpleadosModule, ContratosModule, BeneficiosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
