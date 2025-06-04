import { Module } from '@nestjs/common';
import { TypeBotService } from './type-bot.service';
import { TypeBotController } from './type-bot.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AnalyticsModule } from 'src/analytics/analytics.module';

@Module({
  imports: [HttpModule, ConfigModule, AnalyticsModule],
  controllers: [TypeBotController],
  providers: [TypeBotService],
  exports: [TypeBotService],
})
export class TypeBotModule {}
