import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { TypeBotService } from './type-bot.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateChatDto } from './dtos/create-chat.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('TypeBot')
@Controller({ path: 'type-bot' })
export class TypeBotController {
  constructor(private readonly typeBotService: TypeBotService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Version('1')
  @Get()
  async getListOfBots(@Query('workspaceId') workspaceId: string) {
    return this.typeBotService.getListOfBots(workspaceId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Version('1')
  @Get('billing/usage')
  async getTotalChatUsageForWorkspace(
    @Query('workspaceId') workspaceId: string,
  ) {
    return this.typeBotService.getTotalChatUsageForWorkspace(workspaceId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Version('1')
  @Post('start-chat')
  async startChat(@Body() createChatDto: CreateChatDto) {
    return this.typeBotService.startChat(createChatDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Version('1')
  @Get('embed-url')
  async getEmbedUrl() {
    return this.typeBotService.getEmbedUrl();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Version('1')
  @Get('analytics/stats')
  async getUsageStats() {
    return this.typeBotService.getStats();
  }
}
