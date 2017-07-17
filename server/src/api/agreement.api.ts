// file:    /api/agreement.api.ts
// author:  sjosephs
// date:    20/03/17

import { Router, Response } from 'express';
import * as bpsr     from 'body-parser';
import * as jwt         from 'jsonwebtoken';
import { AUTH_SECRET }  from '../config';
import { TokenCheck }   from '../utils';
import { AuthRequest, MongoError }  from 'types';
import { IAgreement } from 'supplyworks';

import { IAgreementDocument, AgreementModel } from '../models/agreement.model';

export class AgreementAPI {
  public router = Router();

  constructor() { this.buildRouter(); }
  
  buildRouter(): void {
    this.router.use((req, res, next) => {
      TokenCheck(req, res, next);
    })

    this.router.get('/:empId', (req: AuthRequest, res) => {
      AgreementModel.find({ 'employerId': req.params.empId }, (err:MongoError, docs) => {
        if(err) {
          this.errorHandler(err, res);
        } else {
          res.status(200).json({'success': true, 'data': docs});
        }
      })
    });

    this.router.post('/', bpsr.json(), (req: AuthRequest, res) => {
      let agreeNew = req.body as IAgreement;
      let agreeDoc = new AgreementModel;
      console.log('agreement.api:post:agreeNew = ' + JSON.stringify(agreeNew));
      if(agreeNew && agreeDoc){
        agreeDoc.name = agreeNew.name;
        agreeDoc.employerId = agreeNew.employerId;
        agreeDoc.memberId = agreeNew.memberId;
        agreeDoc.agreementType = agreeNew.agreementType;
        if(agreeNew.period) agreeDoc.period = agreeNew.period;

        agreeDoc.save((err, result) => {
          if(err) this.errorHandler(err, res);
          else {
            res.status(200).json({'success':true,'data':result});
          }
        });
      }
    });
  }

  errorHandler(error: any, res?: Response){
    console.error('An error occurred in agreement.api.ts: ' + error.message || error);
    if(res) {
      res.status(500).send(error.message || error);
    }
  }
}