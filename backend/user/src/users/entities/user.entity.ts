import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop() userName!: string;
  @Prop() displayName!: string;
  @Prop({ unique: true }) email!: string;
  @Prop() password!: string;
  @Prop() phone!: string;
  @Prop() age!: string;
  @Prop() gender!: string;
  @Prop() address!: string;
  @Prop() role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
