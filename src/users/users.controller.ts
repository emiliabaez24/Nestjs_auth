import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  ForbiddenException,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDto } from './update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from 'generated/prisma';
import { GetUser } from 'src/auth/decoradores/get-user.decorator';
import { Roles } from 'src/auth/decoradores/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RemovePasswordInterceptor } from '../common/interceptors/remove-password.interceptor';
import { HideRoleInterceptor } from '../common/interceptors/hide-role.interceptor';

@UseInterceptors(RemovePasswordInterceptor, HideRoleInterceptor) //3.2
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //GET /users/:id - Obtener datos de usuario (requiere estar logueado)
  @UseGuards(AuthGuard('jwt'), RolesGuard) //proteccion!!!!
  @Get(':id')
  getUserById(
    @Param('id') id: string,
    @GetUser() user: Usuario, // el usuario que hace la petición
  ) {
    // Solo puede ver su propio usuario
    if (user.id !== Number(id)) {
      throw new ForbiddenException('No tienes acceso a este recurso');
    }
    return this.usersService.findById(Number(id));
  }

  //PATCH /users/:id - Actualizar usuario (requiere estar logueado)
  @UseGuards(AuthGuard('jwt'), RolesGuard) //proteccion!!!!
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @GetUser() user: Usuario,
  ) {
    if (user.id !== Number(id)) {
      throw new ForbiddenException('No puedes editar otro usuario');
    }
    return this.usersService.updateUser(Number(id), dto);
  }

  //DELETE /users/:id - Eliminar usuario (solo si tiene rol ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  deleteUser(@Param('id') id: string, @GetUser() user: Usuario) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Solo los administradores pueden eliminar usuarios',
      );
    }
    return this.usersService.deleteUser(Number(id));
  }
}
