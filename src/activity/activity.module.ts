import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TokenModule],
  providers: [ActivityService],
  controllers: [ActivityController],
})
export class ActivityModule {}
