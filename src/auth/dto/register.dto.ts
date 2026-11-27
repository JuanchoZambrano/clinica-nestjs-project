import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsInt,
  IsPositive,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener mínimo 3 caracteres' })
  @MaxLength(100, {
    message: 'El nombre no puede superar los $constraint1 caracteres',
  })
  userName!: string;

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  @MaxLength(120, {
    message: 'El correo no puede superar los $constraint1 caracteres',
  })
  userEmail!: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, {
    message: 'La contraseña debe tener mínimo 8 caracteres',
  })
  @MaxLength(255, {
    message: 'La contraseña no puede superar los $constraint1 caracteres',
  })
  userPassword!: string;

  @Type(() => Number)
  @IsInt({ message: 'El id del rol debe ser un número entero' })
  @IsPositive({ message: 'El id del rol debe ser un número positivo' })
  roleId: number;
}
