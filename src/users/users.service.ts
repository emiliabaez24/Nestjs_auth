import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserDto } from './update-user.dto';
import { Usuario } from 'generated/prisma';
import { AuthService } from 'src/auth/auth.service';
import { forwardRef } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  async findById(id: number): Promise<Usuario> {
    const user = await this.prisma.usuario.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data: dto,
    });
  }

  async deleteUser(id: number): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
