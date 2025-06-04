import { ApiProperty } from '@nestjs/swagger';
import { TypeMessageChat } from '../enums/type-bot.enum';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MessageChatDto {
  @ApiProperty({ enum: TypeMessageChat, example: TypeMessageChat.TEXT })
  @IsEnum(TypeMessageChat)
  type: string;

  @ApiProperty({ example: 'text' })
  @ValidateIf((o: MessageChatDto) => o.type === TypeMessageChat.TEXT)
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 'https://url/audio' })
  @ValidateIf((o: MessageChatDto) => o.type === TypeMessageChat.AUDIO)
  @IsString()
  @IsNotEmpty()
  audio: string;

  @ApiProperty({ example: 'command' })
  @ValidateIf((o: MessageChatDto) => o.type === TypeMessageChat.COMMAND)
  @IsString()
  @IsNotEmpty()
  command: string;

  @ApiProperty({ example: ['attached_file_urls'] })
  @IsArray()
  @IsString({ each: true })
  attachedFileUrls: string[];

  [key: string]: any;
}

export class CreateChatDto {
  @ApiProperty({ type: MessageChatDto })
  @ValidateNested()
  @Type(() => MessageChatDto)
  message: MessageChatDto;
}
