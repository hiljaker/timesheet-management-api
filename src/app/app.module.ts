import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { env } from '../env';
import { PrismaModule } from '../prisma/prisma.module';
import { EmployeeModule } from '../employee/employee.module';
import { ProjectModule } from '../project/project.module';
import { ActivityModule } from '../activity/activity.module';

@Module({
  imports: [
    ConfigModule.forRoot(env.config),
    PrismaModule,

    // Request Modules
    EmployeeModule,
    ProjectModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
