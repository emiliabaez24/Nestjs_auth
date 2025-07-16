import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(Role, { message: 'El rol debe ser USER o ADMIN' })
  role: string;
}
// verifica que:
// - email sea un email válido.
// - password sea un string y tenga mínimo 6 caracteres.
// rol sea valido
