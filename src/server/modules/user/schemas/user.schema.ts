import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoleEnum } from '../enums/user-role.enum';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null })
  password: string;

  @Prop({ default: null })
  photo: string;

  @Prop({ default: 'en' })
  language: string;

  @Prop({ default: null })
  birthday: Date;

  @Prop({ default: null })
  gender: string;

  @Prop({ default: new Date(), nullable: false })
  registered_at: Date;

  @Prop({ default: new Date(), nullable: false })
  last_login_at: Date;

  @Prop({ default: null })
  provider: string;

  @Prop({ default: null })
  provider_id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
