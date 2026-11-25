import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsInt,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMedicDto {
  @IsString()
  @IsNotEmpty({ message: 'El codigo de profesional es obligatorio' })
  @MinLength(2, {
    message:
      'El codigo de profesional debe tener al menos $constraint1 caracteres',
  })
  @MaxLength(50, {
    message:
      'El codigo de profesional no puede superar los $constraint1 caracteres',
  })
  professionalCode: string;

  @IsString()
  @IsOptional()
  @MaxLength(20, {
    message: 'El teléfono no puede superar los $constraint1 caracteres',
  })
  medicPhone: string;

  @Type(() => Number)
  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  @IsPositive({ message: 'El id de usuario debe ser un número positivo' })
  userId: number;

  @Type(() => Number)
  @IsInt({ message: 'El id de especialidad debe ser un número entero' })
  @IsPositive({ message: 'El id de especialidad debe ser un número positivo' })
  specialtyId: number;
}
