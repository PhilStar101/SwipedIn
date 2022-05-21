import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

import { Socials } from '../../../dtos';
import { Role } from './common';

@Schema()
export class Hirer extends Document {
  // @Prop(
  //   raw({
  //     google: { type: String },
  //   }),
  // )
  // providerIds: ProviderIds;

  @Prop({
    type: String,
    enum: Role,
    default: Role.Hirer,
  })
  type: Role;

  @Prop()
  name: string;

  @Prop({ unique: true, sparse: true })
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

// HirerSchema.statics.findByProviderId = function (
//   provider: string,
//   id: string,
// ) {
//   return this.findOne({
//     providerIds: {
//       [provider]: id,
//     },
//   });
// };

export type HirerModel = Model<Hirer>;

// export interface HirerModel extends Model<Hirer> {
//   findByProviderId: (provider: string, id: string) => Hirer;
// }
