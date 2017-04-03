// file:    /api/employer.api.ts
// author:  sjosephs
// date:    30/03/17

import { Router, Response } from 'express';
import * as bpsr            from 'body-parser';
import { Employer }         from 'supplyworks';
import { TokenCheck }       from '../utils';
import { AuthRequest }      from '../types';

import { 
  EmployerModel, 
  EmployerDocument, 
  AddressDocument 
} from '../models/employer.model';

export class EmployerAPI {
  public router = Router();

  constructor() { this.buildRouter(); }

  buildRouter(): void {

    this.router.post('/', bpsr.json(), (req, res) => {
      let empNew = req.body as Employer;
      let empDoc = new EmployerModel;
      if( empNew ) {
        if(empNew.name && empNew.address && empNew.contactId) {
          empDoc.name = empNew.name;
          empDoc.address = empNew.address;
          empDoc.contactId = empNew.contactId;
          
          empDoc.save((err, result) => {
            if( err ) {
              this.errorHandler(err, res);
            } else {
              if( result ) { 
                res.status(200).json({'success': true, 'data': result});
              } else {
                res.status(500).json({'success': false, 'data': 'there was no data returned during save'});
              }
            }
          });
        }
      }
    });

    /* 
    ********************************
    ** routes below are protected **
    ********************************
    */

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

    this.router.get('/:id', (req: AuthRequest, res) => {
      EmployerModel.findById( req.params.id, (err, emp) => {
        if(err) this.errorHandler(err, res);
        else {
          if(emp) {
            if(emp._id === req.token.schoolId){
              res.status(200).json({'success': true, 'data': emp});
            } else {
              res.status(401).json({'success': false, 'data': 'not authorised'});
            }
          } else {
            res.status(200).json({'success': true, 'data': null});
          }
        }
      });
    });

    this.router.put('/:id', bpsr.json(), (req: AuthRequest, res) => {
      if( req.params.id ){
        EmployerModel.findById(req.params.id, (err, doc) => {
          if(err) {
            this.errorHandler(err, res);
          } else {
            if(doc) {
              if(req.token.isSuper || (req.token.isAdmin && req.token.schoolId === doc._id)) { 
                let data = req.body as Employer;
                if(data.name) doc.name = data.name;
                if(data.address) doc.address = data.address;
                if(data.contact) doc.contact = data.contact;
                doc.save((err, result) => {
                  if(err){
                    this.errorHandler(err, res);
                  } else {
                    if(result) {
                      res.status(200).json({'success': 'true', 'data': result});
                    }
                  }
                });
              } else {
                res.status(401).json({'success': 'false', 'data': 'not authorised'});
              }
            }
          }
        });
      }
    });
  }

  errorHandler(error: any, res?: Response){
    console.error('An error occurred in employer.api.ts: ' + error.message || error);
    if(res) {
      res.status(500).json({ 'success': 'false', 'data': (error.message || error)});
    }
  }
}