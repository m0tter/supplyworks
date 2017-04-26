// file:    /api/employer.api.ts
// author:  sjosephs
// date:    30/03/17

import { Router, Response } from 'express';
import * as bpsr            from 'body-parser';
import { Employer, User }         from 'supplyworks';
import { TokenCheck }       from '../utils';
import { AuthRequest }      from '../types';
import { UserModel }        from '../models/user.model';
import { MongoError }       from 'types';

import { 
  EmployerModel, 
  EmployerDocument, 
  AddressDocument 
} from '../models/employer.model';

export class EmployerAPI {
  public router = Router();

  constructor() { this.buildRouter(); }

  buildRouter(): void {

    this.router.post('/register', bpsr.json(), (req, res) => {
      let empDoc = new EmployerModel;
      let userDoc = new UserModel;
      let empNew = req.body.employer as Employer;
      let userNew = req.body.user as User;

      if( userNew ) {
        if(userNew.lastName && userNew.firstName && userNew.email && userNew.password) {
          userDoc.firstName = userNew.firstName;
          userDoc.lastName = userNew.lastName;
          userDoc.email = userNew.email;
          userDoc.password = userNew.password;
          userDoc.mobilePhone = userNew.mobilePhone;
          userDoc.isAdmin = true;
          userDoc.save((err:MongoError, savedUser) => {
            if(err) {
              console.error('an error occurred saving the user: ' + err.code);
              if(err.code === 11000) res.status(200).json({'success': false, 'data': 'A user with this email address already exists'});
              else
                this.errorHandler(err, res);
            }
            else {
              if( empNew ) {
                if(empNew.name && empNew.address) {
                  empDoc.name = empNew.name;
                  empDoc.address = empNew.address;
                  empDoc.employeeId = savedUser._id;
                  empDoc.contactId = savedUser._id;
            
                  empDoc.save((empErr, result) => {
                    if( empErr ) {
                      console.error('an error occurred saving the employer');
                      this.errorHandler(empErr, res);
                    } else {
                      if( result ) { 
                        res.status(200).json({'success': true, 'data': result});
                      } else {
                        res.status(500).send('there was no data returned during save');
                      }
                    }
                  });
                }
              }
            }
          });
        } else {
          res.status(200).json({'success': false, 'data': 'missing user information'});
        }
      } else {
        res.status(200).json({'success': false, 'data': 'user record missing'});
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
            if(emp._id == req.token.employerId){
              res.status(200).json({'success': true, 'data': emp});
            } else {
              res.status(401).send('401 - not authorised');
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
              if(req.token.isAdmin && req.token.employerId == doc._id) { 
                let data = req.body as Employer;
                console.log('data:' + JSON.stringify(data));
                if(data.name) doc.name = data.name;
                if(data.address) doc.address = data.address;
                // if(data.contact) doc.contact = data.contact;
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
                res.status(401).send('401 - not authorised');
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
      res.status(500).send(error.message || error);
    }
  }
}
