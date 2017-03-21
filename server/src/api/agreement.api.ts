// file:    /api/agreement.api.ts
// author:  sjosephs
// date:    20/03/17

import { Router, Request } from 'express';
import * as bparser     from 'body-parser';
import * as jwt         from 'jsonwebtoken';
import { AUTH_SECRET }  from '../config';

interface AuthRequest extends Request { token: string; }

export class AgreementAPI {
  public router = Router();

  constructor() { this.buildRouter(); }
  
  buildRouter(): void {
    this.router.use(bparser.json(), (req: AuthRequest, res, next) => {
      var token: string;
      if( req && req.headers['x-access-token']) token = req.headers['x-access-token'];
      if( token ) {
        jwt.verify( token, AUTH_SECRET, ( err: any, decoded: jwt.VerifyCallback ) => {
          if( err ) res.status( 401 ).json({ 'success': 'false', 'message': '401 - NOT AUTHORISED' });
          else {
            req.token = 
            next();
          }
        });
      } else { res.status( 401 ).send('401 - NOT AUTHORISED') };
    });

    this.router.get('/', (req, res) => {
      
    });
  }
}