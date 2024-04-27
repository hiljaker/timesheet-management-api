import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { env } from 'src/env';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { ProjectModule } from 'src/project/project.module';
import { ActivityModule } from 'src/activity/activity.module';

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
