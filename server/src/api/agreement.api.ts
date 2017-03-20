// file:    /api/agreement.api.ts
// author:  sjosephs
// date:    20/03/17

import { Router } from 'express';
import * as bparser from 'body-parser';
import { AUTH_SECRET } from '../config';

export class AgreementAPI {
  public router = Router();

  constructor() { this.buildRouter(); }

  buildRouter(): void {
    this.router.get('/', (req, res) => {
      
    });
  }
}