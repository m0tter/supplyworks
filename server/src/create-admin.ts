import { UserModel, UserDocument } from './models/user.model';
import * as mongoose from 'mongoose';
import * as config from './config';

mongoose.connect(config.connectionStringLocalDB);
var newUser = new UserModel;
newUser.email = 'admin@supplyworks';
newUser.password = 'admin';
newUser.isAdmin = true;
newUser.save((err, result) => {
  if( err ) console.error('Error creating user: ' + (err.message || err));
  console.log('user created:\n' + result);
  process.exit(0);
});
