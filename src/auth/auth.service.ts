/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, // Inyectamos Prisma
    private jwtService: JwtService, // Inyectamos el servicio de JWT
    private eventEmitter: EventEmitter2,
    private usersService: UsersService,
  ) {}

  async register(dto: RegisterUserDto) {
    // Verificar si ya existe
    const userExists = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });
    if (userExists) {
      throw new ForbiddenException('El correo ya está registrado');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Crear el usuario
    const user = await this.prisma.usuario.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: dto.role?.toUpperCase() === 'ADMIN' ? Role.ADMIN : Role.USER, //si dto.role es "ADMIN" (en mayúsculas o minúsculas), se guarda como Role.ADMIN; si no, como Role.USER.
      },
    });
    this.eventEmitter.emit('user.registered', user);

    // Retornar token JWT
    return this.generateToken(user.id, user.email, user.role);
  }

  async login(dto: LoginUserDto) {
    const { email, password } = dto;

    // 1. Buscar el usuario por email
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });
    if (!user) throw new ForbiddenException('Credenciales incorrectas');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Credenciales incorrectas');
    }

    // 3. Generar token
    return this.generateToken(user.id, user.email, user.role);
  }

  private generateToken(id: number, email: string, role: string) {
    const payload = { sub: id, email, role };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
