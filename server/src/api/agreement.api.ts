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

    this.router.get('/', (req: AuthRequest, res) => {
      AgreementModel.find({ 'employerId': req.token.employerId }, (err:MongoError, docs) => {
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
      if(agreeNew && agreeDoc){
        agreeDoc.name = agreeNew.name;
        agreeDoc.employerId = agreeNew.employerId;
        agreeDoc.memberId = agreeNew.memberId;
        agreeDoc.agreementType = agreeNew.agreementType;
        if(agreeNew.period) agreeDoc.period = agreeNew.period;
        if(agreeNew.lessons) agreeDoc.lessons = agreeNew.lessons;
        agreeDoc.countBreaks = agreeNew.countBreaks;
        agreeDoc.allowOverride = agreeNew.allowOverride; 

        agreeDoc.save((err, result) => {
          if(err) this.errorHandler(err, res);
          else {
            res.status(200).json({'success':true,'data':result});
          }
        });
      }
    });

    this.router.put('/:id', bpsr.json(), (req: AuthRequest, res) => {
      let agree = <IAgreement>req.body;
      if(agree) {
        AgreementModel.findByIdAndUpdate(req.params.id, { 
          $set: { 
            name: agree.name,
            period: agree.period,
            memberId: agree.memberId,
            lessons: agree.lessons,
            countBreaks: agree.countBreaks,
            agreementType: agree.agreementType,
            allowOverride: agree.allowOverride
          } 
        }, (err, doc) => {
          if(err) this.errorHandler(err, res);
          else res.status(200).json({'success': true, 'data': doc});
        });
      } else res.status(204).json({'success': false, 'data': 'can not update agreement, no ID supplied'});
    });

    this.router.delete('/:id', (req: AuthRequest, res) => {
      AgreementModel.findOneAndRemove(req.params.id, (err, doc) => {
        if(err) { 
          this.errorHandler(err, res); 
        } else {
          if(doc)
            res.status(200).json({'success': true, 'data': doc});
          else
            res.status(200).json({'success': false, 'data': 'no document found to delete'});
        }
      });
    });
  }

  errorHandler(error: any, res?: Response){
    console.error('An error occurred in agreement.api.ts: ' + error.message || error);
    if(res) {
      res.status(500).send(error.message || error);
    }
  }
}