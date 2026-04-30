import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  productName?: string;

  @Prop({ required: true })
  productDisplayName?: string;

  @Prop({ required: true })
  price?: number;

  @Prop()
  description?: string;

  @Prop()
  category?: string;

  @Prop()
  brand?: string;

  @Prop({ default: 0 })
  stock?: number;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop({ default: 0 })
  discount?: number;

  @Prop({ default: 0 })
  rating?: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
