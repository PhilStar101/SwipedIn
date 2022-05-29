import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

import { Socials } from '../../../dtos';
import { Role } from './common';

@Schema()
export class Hirer extends Document {
  @Prop(
    raw({
      password: { type: String },
      rt: { type: String },
    }),
  )
  auth: {
    password: string;
    rt: string;
  };

  @Prop({
    type: String,
    enum: Role,
    default: Role.Hirer,
  })
  type: Role;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  webSite: string;

  @Prop()
  stack: string[];

  @Prop()
  salary: number;

  @Prop(
    raw({
      instagram: { type: String },
      twitter: { type: String },
      gitHub: { type: String },
      linkedIn: { type: String },
    }),
  )
  socials: Socials;
}

export const HirerSchema = SchemaFactory.createForClass(Hirer);
export type HirerModel = Model<Hirer>;
