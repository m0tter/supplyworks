// file:    /api/employer.api.ts
// author:  sjosephs
// date:    30/03/17

import { Router, Response }   from 'express';
import * as bpsr    from 'body-parser';
import { Employer } from 'supplyworks';
import { TokenCheck } from '../utils';
import { AuthRequest } from '../types';

import { EmployerModel, EmployerDocument, AddressDocument } from '../models/employer.model';

export class EmployerAPI {
  public router = Router();

  constructor() { this.buildRouter(); }

  buildRouter(): void {
    this.router.use((req, res, next) => {
      TokenCheck(req, res, next);
    });

    this.router.get('/all', (req: AuthRequest, res) => {
      if(req.token.isSuper) {
        EmployerModel.find((err, employers: Employer[] ) => {
          if(err) this.errorHandler(err, res);
          if(employers) {
            res.status(200).json({'success': 'true', 'data': employers});
          }
        });
      } else {
        res.status(401).send('401 - NOT AUTHORISED');
      }
    });

    this.router.get('/:id', (req, res) => {
    
    });
  }

  

  errorHandler(error: any, res?: Response){
    console.error('An error occurred in employer.api.ts: ' + error.message || error);
    if(res) {
      res.status(500).json({ 'success': 'false', 'data': (error.message || error)});
    }
  }
}