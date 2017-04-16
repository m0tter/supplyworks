import { Model, Schema, Document, model } from 'mongoose';
import { UserBase } from 'supplyworks';
import * as bcrypt from 'bcrypt';
import { SALT_WORK_FACTOR } from '../config/auth.config';

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true }},
  mobilePhone: String,
  isAdmin: Boolean,
  employerId: Schema.Types.ObjectId
});

UserSchema.pre('save', function(next) {
  let user = this;

  if(!this.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if(err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(passwordToCheck:string, cb:Function) {
  bcrypt.compare(passwordToCheck, this.password, (err, isMatch) => {
    if(err) return cb(err);
    cb(null, isMatch);
  });
}

// TODO limit number of password attempts

export interface UserDocument extends UserBase, Document { }
export const UserModel = model<UserDocument>('Users', UserSchema);