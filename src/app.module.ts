import { Module } from '@nestjs/common';
import { TypeBotModule } from './type-bot/type-bot.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BaseResponseResponseInterceptor } from './common/interceptors/base-response.intercepror';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV == 'development'
          ? `.env.${process.env.NODE_ENV}`
          : `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    TypeBotModule,
    AuthModule,
    AnalyticsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: BaseResponseResponseInterceptor,
    },
  ],
})
export class AppModule {}
