import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

import { ProviderIds } from '../../dtos';

@Schema()
export class Profile extends Document {
  @Prop(
    raw({
      google: { type: String },
    }),
  )
  providerIds: ProviderIds;

  @Prop()
  email: string;

  @Prop({ unique: true, sparse: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  avatar: string;

  @Prop()
  confirmed: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

ProfileSchema.statics.findByProviderId = function (
  provider: string,
  id: string,
) {
  return this.findOne({
    providerIds: {
      [provider]: id,
    },
  });
};

export interface ProfileModel extends Model<Profile> {
  findByProviderId: (provider: string, id: string) => Profile;
}
