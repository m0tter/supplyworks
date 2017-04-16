// file:    /api/user.api.ts
// author:  sjosephs
// date:    050417

import { Router, Response } from 'express';
import * as bpsr from 'body-parser';
import { User } from 'supplyworks';
import { UserModel, UserDocument} from '../models/user.model';

export class UserAPI {
  public router = Router();

  constructor() { 
    this.router.post('/', bpsr.json(), (req, res) => {
      let userNew = req.body as User;
      let userDoc = new UserModel;
      
      if(userNew && userDoc) {
        if(userNew.email, userNew.password, userNew.firstName, userNew.lastName){
          userDoc.email     = userNew.email;
          userDoc.password  = userNew.password;
          userDoc.firstName = userNew.firstName;
          userDoc.lastName  = userNew.lastName;
          if(userNew.employerId) {
            // TODO update employer records with user ID
          }
          
          userDoc.save((err, result) => {
            if(err) { this.errorHandler(err, res); }
            else {
              res.status(200).json({'success': true, 'data': result});
            }
          });
        } else {
          res.status(200).json({'success':false, 'data': 'Required field missing'});
        }
      } else {
        res.status(500).send('Server error saving file');
      }
    });
  }

  errorHandler(error: any, res?: Response) {
    console.error('Error in userAPI: ' + error.message || error);
    if(res) res.status(500).send(error.message || error);
  }
}