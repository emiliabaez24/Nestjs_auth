import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;
}
//permite actualizar opcionalmente el email y/o password.
