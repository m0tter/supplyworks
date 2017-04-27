// file:    utils/utils.ts
// author:  sjosephs
// date:    30/3/17

import { Request, Response, NextFunction }  from 'express';
import * as crypto                          from 'crypto';
import * as jwt                             from 'jsonwebtoken';
import { AuthRequest }                      from '../types';
import { PRIVATE_KEY, AUTH_SECRET }         from '../config/auth.config';

let algorithm = 'aes-256-ctr';

export function decrypt(password: string){
  let decipher = crypto.createDecipher(algorithm, PRIVATE_KEY);
  let dec = decipher.update(password, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

export function encrypt(password: string){
  let cipher = crypto.createCipher(algorithm, PRIVATE_KEY);
  let crypted = cipher.update(password, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

export function TokenCheck(req: Request, res: Response, next: NextFunction){
  if( req && req.headers['x-access-token'] ) {
    var authReq = <AuthRequest>req;
    var token = req.headers['x-access-token'];
    if( token ) {
      jwt.verify( token, AUTH_SECRET, (err: any, decoded: any) => {
        if( err ) {
          console.log('tokencheck error: ' + err);
          res.status( 401 ).send('401 - NOT AUTHORISED');
        } else {
          authReq.token = decoded;
          next();
        }
      });
    } else { res.status( 401 ).send('401 - NOT AUTHORISED'); }
  } else { res.status( 401 ).send('401 - NOT AUTHORISED'); }
}

