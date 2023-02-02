import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { refOther } from '../refOther/schemas/refOther.schema';

export type UserDocument = mongoose.HydratedDocument<User>;

// export class Adress {
//     @Prop()
//     addr1: string;

//     @Prop()
//     city: string;

//     @Prop()
//     zip: number;
// }

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: Date.now })
  created: Date;

  // @Prop()
  // address: Adress;

  @Prop(
    raw({
      addr1: { type: String },
      city: { type: String },
      zip: { type: Number },
    }),
  )
  address: Record<string, any>;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'refOther' })
  // owner: refOther
}

export const UserSchema = SchemaFactory.createForClass(User);
