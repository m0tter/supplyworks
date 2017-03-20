import { Model, Schema, Document, model } from 'mongoose';
import { UserBase } from 'supplyworks';

let UserSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  mobilePhone: String,
  isAdmin: Boolean
});

export interface UserDocument extends UserBase, Document { }
export var UserModel = model<UserDocument>('Users', UserSchema);