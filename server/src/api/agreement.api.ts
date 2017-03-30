// file:    /api/agreement.api.ts
// author:  sjosephs
// date:    20/03/17

import { Router, Request } from 'express';
import * as bparser     from 'body-parser';
import * as jwt         from 'jsonwebtoken';
import { AUTH_SECRET }  from '../config';
import { TokenCheck }   from '../utils';

export class AgreementAPI {
  public router = Router();

  constructor() { this.buildRouter(); }
  
  buildRouter(): void {
    this.router.use((req, res, next) => {
      TokenCheck(req, res, next);
    })

    this.router.get('/', (req, res) => {
      res.status(200).send('its all good');
    });
  }
}