import { Model, Schema, Document, model } from 'mongoose';
import { UserBase } from 'supplyworks';

let UserSchema = new Schema({
  firstName: String,
  lastName: String,
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobilePhone: String,
  isAdmin: Boolean,
  schoolId: Schema.Types.ObjectId
});

export interface UserDocument extends UserBase, Document { }
export var UserModel = model<UserDocument>('Users', UserSchema);