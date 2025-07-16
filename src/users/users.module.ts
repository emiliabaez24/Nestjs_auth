import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule), // <--- CLAVE
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // <--- NECESARIO para que otros módulos puedan usarlo
})
export class UsersModule {}
