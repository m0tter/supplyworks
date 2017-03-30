// file:    api/auth.api.ts
// author:  sjosephs
// date:    20/03/17

import { Router, Response, Request, NextFunction } from 'express';
import { AUTH_EXPIRY, AUTH_SECRET } from '../config';
import { UserModel, UserDocument } from '../models/user.model';
import { User } from 'supplyworks';
import * as jwt from 'jsonwebtoken';
import * as bpasr from 'body-parser';

export class AuthAPI {
  public router = Router();

  constructor() { this.buildRouter(); }

  buildRouter(): void {
    this.router.post('/', bpasr.json(), (req, res) => {
      var body = <User>req.body;
      UserModel.findOne({'email': body.email, 'password': body.password }, (err, user: UserDocument) => {
        if( err ) this.errorHandler(err);
        if( !user ) {
          res.status( 200 ).json( {success: 'false', message: 'Incorrect username or password.' } );
        } else {
          var token = jwt.sign({ username: user.email, isAdmin: user.isAdmin, schoolId: user.schoolId }
            , AUTH_SECRET, { expiresIn: AUTH_EXPIRY });
          res.status( 200 ).json( {success: 'true', data: token} );
        }
      });
    });
  }

  private errorHandler(error: any, response?: Response){ 
    console.error( 'Error in auth.api.ts - ' + (error.message || error) );
    response.status( 500 ).send('Error in auth.api.ts - ' + (error.message || error));
  }
}
