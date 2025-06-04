import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Analytics } from './schema/analytics.schema';
import { Model } from 'mongoose';
import { IAnalytics } from './interfaces/analytics.interface';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name)
    private readonly analyticsSchema: Model<Analytics>,
  ) {}

  async create(iAnalytics: IAnalytics) {
    return this.analyticsSchema.create(iAnalytics);
  }
  async getTotalSessionsByBotId(botId: string) {
    return this.analyticsSchema.find({ typeBotId: botId });
  }
}
