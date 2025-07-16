// clase que implementa el job que se ejecuta a medianoche.
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class UserCountTask {
  private readonly logger = new Logger(UserCountTask.name);

  constructor(private readonly prisma: PrismaService) {}

  // Se ejecuta todos los días a la medianoche
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) //cron programado
  //   @Cron('*/30 * * * * *') // prueba, funciono!!
  async handleCron() {
    const totalUsers = await this.prisma.usuario.count();
    this.logger.log(
      `Hay ${totalUsers} usuarios registrados al llegar la medianoche.`,
    );
  }
}
