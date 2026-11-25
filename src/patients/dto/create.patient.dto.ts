import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, {
    message: 'El nombre debe tener al menos $constraint1 caracteres',
  })
  @MaxLength(100, {
    message: 'El nombre no puede superar los $constraint1 caracteres',
  })
  patientName: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MinLength(2, {
    message: 'El apellido debe tener al menos $constraint1 caracteres',
  })
  @MaxLength(100, {
    message: 'El apellido no puede superar los $constraint1 caracteres',
  })
  patientLastName: string;

  @IsString()
  @IsNotEmpty({ message: 'Este campo es obligatorio' })
  @MaxLength(30, {
    message: 'El documento no puede superar los $constraint1 caracteres',
  })
  personalId: string;

  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  @Type(() => Date)
  @IsDate({ message: 'La fecha debe ser una fecha válida' })
  birthDate: Date;

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  @MaxLength(120, {
    message: 'El correo no puede superar los $constraint1 caracteres',
  })
  patientEmail: string;

  @IsString()
  @IsOptional()
  @MaxLength(20, {
    message: 'El teléfono no puede superar los $constraint1 caracteres',
  })
  patientPhone: string;

  @IsString()
  @IsOptional()
  @MaxLength(200, {
    message: 'La dirección no puede superar los $constraint1 caracteres',
  })
  patientAddress: string;
}
