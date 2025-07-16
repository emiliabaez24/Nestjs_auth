/* eslint-disable @typescript-eslint/require-await */
import { UserListener } from './events/user.listener';
import { Module, forwardRef } from '@nestjs/common'; //error 1
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module'; //error 1

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }), // habilita .env para toda la app
    forwardRef(() => UsersModule), // error 1
    JwtModule.registerAsync({
      imports: [ConfigModule, forwardRef(() => UsersModule)],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'), // le pasás el secreto
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy, //registra la estrategia
    AuthService,
    UserListener,
  ],
  exports: [AuthService], //error 1
})
export class AuthModule {}
