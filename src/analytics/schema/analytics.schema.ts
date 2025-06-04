import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Analytics extends Document {
  @Prop({ type: String, required: true })
  sessionId: string;

  @Prop({ type: String, required: true })
  publicId: string;

  @Prop({ type: String, required: true })
  typeBotId: string;

  @Prop({ default: 0 })
  totalMessages: number;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
