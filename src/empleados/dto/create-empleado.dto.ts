import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEmpleadoDto {

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  firstName: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  lastName: string;

  @IsEmail({}, { message: 'El email debe ser una dirección de correo electrónico válida' })
  email: string;

  @IsOptional()
  cargoId: number;

  @IsOptional()
  departamentoId: number;

  @IsOptional()
  contratoId: number;
}
