// file:    /app/casual/services/register.service.ts
// author:  sjosephs
// date:    18/04/17

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Employer, User } from 'supplyworks';
import { API_EMPLOYER } from 'api-paths';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegisterService {

  constructor( private http: Http ) { }

  Register(employer: Employer, user: User):Promise<any> {
    var data = JSON.stringify({'employer': employer, 'user': user});
    console.log('data: ' + data);
    return this.http.post(API_EMPLOYER.register, data)
      .toPromise()
      .then(resp => { 
        let result = resp.json().data;
        if(result.success) return Promise.resolve(result.data);
        else return Promise.reject('Error processing registration');
      })
      .catch(err => { return Promise.reject(err); });
  }
}