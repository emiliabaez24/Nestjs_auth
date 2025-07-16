import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth') // Prefijo de ruta: /auth
export class AuthController {
  constructor(private authService: AuthService) {} // Inyectamos el servicio

  @Post('register') // POST /auth/register
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto); // Llama al servicio con el cuerpo de la petición
  }

  @Post('login') // POST /auth/loginc
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto); // Llama al servicio con el cuerpo de la petición
  }
}
