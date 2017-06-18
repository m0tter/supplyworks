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
          if(userNew.mobilePhone) userDoc.mobilePhone = userNew.mobilePhone;
          userDoc.isAdmin = true && userNew.isAdmin; 
          
          userDoc.save((err, result) => {
            if(err) { this.errorHandler(err, res); }
            else {
              if(userNew.employerId) {
                EmployerModel.findByIdAndUpdate(userNew.employerId, 
                {$push: {'employeeId': result._id}},(err, emp) => {
                  if(err) this.errorHandler('Error updating employer record with employee id', res);
                  res.status(200).json({'success': true, 'data': result});
                });
              } 
              else { 
                res.status(200).json({'success': true, 'data': result});
              }
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

    this.router.put('/:id', bpsr.json(), (req, res) => {
      let user = <IUser>req.body;
      UserModel.findById(user._id, (err, doc) => {
        if(err) this.errorHandler(err, res);
        else {
          if(user.email       != doc.email)       doc.email       = user.email;
          if(user.firstName   != doc.firstName)   doc.firstName   = user.firstName;
          if(user.lastName    != doc.lastName)    doc.lastName    = user.lastName;
          if(user.mobilePhone != doc.mobilePhone) doc.mobilePhone = user.mobilePhone;
          if(user.isAdmin     != doc.isAdmin)     doc.isAdmin     = user.isAdmin;

          doc.save((err, result) => {
            if(err) this.errorHandler(err, res);
            else {
              res.status(200).json({'success': true, 'data': result});
            }
          });
        }
      });
    });

    this.router.delete('/:emId/:eeId', (req, res) => {
      EmployerModel.findOne({'contactId': req.params.eeId}, (err, doc) => {
        if(err) this.errorHandler(err, res);
        if(doc) { // found the employee is still the registered contact
          return res.status(200).json({'success': false, 
            'data': 'user is the employer contact. Change contact before deleting'});
        } else {
          // remove the employeeId from the employer record but don't delete the user record
          EmployerModel.findByIdAndUpdate(req.params.emId,
            {$pull: {'employeeId': req.params.eeId}},
            (err, updateDoc) => {
              if(err) this.errorHandler(err, res);
              if(updateDoc)
                res.status(200).json({'success': true});
              else
                res.status(204).json({'success': false, 'data': 'employer not found'});
          });
        }
      });
    });
    
  } // end router

  errorHandler(error: any, res?: Response) {
    console.error('Error in userAPI: ' + error.message || error);
    if(res) res.status(500).send(error.message || error);
  }
}