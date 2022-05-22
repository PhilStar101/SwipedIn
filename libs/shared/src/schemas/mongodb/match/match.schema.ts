import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

import { CreateMatchDto } from '../../../dtos';
import { Role } from '../profile';

@Schema()
export class Match extends Document {
  @Prop({
    type: Number,
    enum: Role,
  })
  fromRole: Role;

  @Prop(
    raw({
      hirer: { type: String, ref: 'Hirer' },
      employee: { type: String, ref: 'Employee' },
    }),
  )
  data: CreateMatchDto;
}

export const MatchSchema = SchemaFactory.createForClass(Match);

export type MatchModel = Model<Match>;
