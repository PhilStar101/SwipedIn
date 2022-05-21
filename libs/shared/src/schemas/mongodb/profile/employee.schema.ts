import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

import { Experience, Name, Socials } from '../../../dtos';
import { Role } from './common';

@Schema()
export class Employee extends Document {
  // @Prop(
  //   raw({
  //     google: { type: String },
  //   }),
  // )
  // providerIds: ProviderIds;

  @Prop({
    type: String,
    enum: Role,
    default: Role.Employee,
  })
  type: Role;

  @Prop(
    raw({
      firstName: { type: String },
      lastName: { type: String },
    }),
  )
  name: Name;

  @Prop()
  age: number;

  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop()
  webSite: string;

  @Prop(
    raw({
      time: { type: Number },
      companies: [{ type: String }],
      stack: [{ type: String }],
    }),
  )
  experience: Experience;

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

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

// EmployeeSchema.statics.findByProviderId = function (
//   provider: string,
//   id: string,
// ) {
//   return this.findOne({
//     providerIds: {
//       [provider]: id,
//     },
//   });
// };

export type EmployeeModel = Model<Employee>;

// export interface EmployeeModel extends Model<Employee> {
//   findByProviderId: (provider: string, id: string) => Employee;
// }
