//Módulo que registra las tareas Cron
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UserCountTask } from './ user-count.task';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule],
  providers: [UserCountTask],
})
export class CronModule {}
