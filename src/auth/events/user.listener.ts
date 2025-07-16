import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Usuario } from '@prisma/client';

@Injectable()
export class UserListener {
  private readonly logger = new Logger(UserListener.name);

  @OnEvent('user.registered')
  handleUserRegisteredEvent(user: Usuario) {
    this.logger.log(`Usuario registrado: ${user.email}`);
    // Acá puedo agregar: enviar email de bienvenida, etc.
  }
}
