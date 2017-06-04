// file:    /api/user.api.ts
// author:  sjosephs
// date:    050417

import { Router, Response } from 'express';
import * as bpsr from 'body-parser';
import { IUser } from 'supplyworks';
import { UserModel, UserDocument} from '../models/user.model';
import { EmployerModel, EmployerDocument } from '../models/employer.model';
import { TokenCheck } from '../utils'

export class UserAPI {
  public router = Router();

  constructor() { 
    this.router.post('/', bpsr.json(), (req, res) => {
      let userNew = req.body as IUser;
      let userDoc = new UserModel;
      
      if(userNew && userDoc) {
        if(userNew.email, userNew.password, userNew.firstName, userNew.lastName){
          userDoc.email     = userNew.email;
          userDoc.password  = userNew.password;
          userDoc.firstName = userNew.firstName;
          userDoc.lastName  = userNew.lastName;
          if(userNew.employerId) {
            // TODO update employer records with user ID
          }
          
          userDoc.save((err, result) => {
            if(err) { this.errorHandler(err, res); }
            else {
              res.status(200).json({'success': true, 'data': result});
            }
          });
        } else {
          res.status(200).json({'success':false, 'data': 'Required field missing'});
        }
      } else {
        res.status(500).send('Server error saving file');
      }
    });

    this.router.use((req, res, next) => {
      TokenCheck(req, res, next);
    });

    this.router.get('/:id', (req, res) => {
      EmployerModel.findById(req.params.id, (err, emplr) => {
        if(err) this.errorHandler(err);
        else {
          let users: IUser[] = [];
          emplr.employeeId.forEach(id => {
            UserModel.findById(id, (uErr, user) => {
              if(err) this.errorHandler(uErr); 
              else { 
                users.push(user);
                if(users.length === emplr.employeeId.length) res.status(200).json({'success':true, 'data':users});
              }
            });
          });
        }
      });
    });

    this.router.delete('/:id', (req, res) => {
      EmployerModel.findByIdAndRemove(req.params.id, (err, user) => {
        if(err) this.errorHandler(err);
        if(req.params.id == user._id)
          res.status(200).json({'success': true, 'data':user._id});
        else
          res.status(200).json({'success': false, 'data': 'user ID did not match supplied ID'});
      });
    });

  }

  errorHandler(error: any, res?: Response) {
    console.error('Error in userAPI: ' + error.message || error);
    if(res) res.status(500).send(error.message || error);
  }
}