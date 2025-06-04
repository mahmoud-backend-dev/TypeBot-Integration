import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateChatDto } from './dtos/create-chat.dto';
import { AnalyticsService } from 'src/analytics/analytics.service';

@Injectable()
export class TypeBotService {
  private readonly typeBotURL: string;
  private readonly typeBotToken: string;
  private readonly publicID: string;
  private readonly typeBotURLChat: string;
  private readonly typeBotId: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly analyticsService: AnalyticsService,
  ) {
    this.typeBotURL = this.configService.get<string>('TYPE_BOT_URL') as string;
    this.typeBotToken = this.configService.get<string>(
      'TYPE_BOT_TOKEN',
    ) as string;
    this.publicID = this.configService.get<string>('PUBLIC_ID') as string;
    this.typeBotURLChat = this.configService.get<string>(
      'TYPE_BOT_URL_CHAT',
    ) as string;
    this.typeBotId = this.configService.get<string>('TYPE_BOT_ID') as string;
  }

  // Utility function to handle HTTP requests and avoid repetition
  private async sendRequest(options: any) {
    try {
      console.log({ options });
      const result = await firstValueFrom(this.httpService.request(options));
      return result.data;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error: ${JSON.stringify(error) || 'Unknown error'}`,
      );
    }
  }

  async getListOfBots(workspaceId: string) {
    const options = {
      method: 'GET',
      url: `${this.typeBotURL}/typebots?workspaceId=${workspaceId}`,
      headers: {
        Authorization: `Bearer ${this.typeBotToken}`,
      },
    };
    return this.sendRequest(options);
  }

  async getTotalChatUsageForWorkspace(workspaceId: string) {
    const options = {
      method: 'GET',
      url: `${this.typeBotURL}/billing/usage?workspaceId=${workspaceId}`,
      headers: {
        Authorization: `Bearer ${this.typeBotToken}`,
      },
    };
    return this.sendRequest(options);
  }

  async startChat(createChatDto: CreateChatDto) {
    const options = {
      method: 'POST',
      url: `${this.typeBotURLChat}/typebots/${this.publicID}/startChat`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: createChatDto,
    };
    const data = await this.sendRequest(options);
    await this.analyticsService.create({
      publicId: this.publicID,
      sessionId: data.sessionId,
      typeBotId: data.typebot.id,
      totalMessages: data.messages.length || 0,
    });
    return data;
  }

  async getStats() {
    const options = {
      method: 'GET',
      url: `${this.typeBotURL}/typebots/${this.typeBotId}/analytics/stats`,
      headers: {
        Authorization: `Bearer ${this.typeBotToken}`,
      },
    };
    const data = await this.sendRequest(options);
    const totalSessions = await this.analyticsService.getTotalSessionsByBotId(
      this.typeBotId,
    );
    data.stats.totalSessions = totalSessions.length;
    return data;
  }
  getEmbedUrl(): string {
    return `https://typebot.io/${this.publicID}`;
  }
}
