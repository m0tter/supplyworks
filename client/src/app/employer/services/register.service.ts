// file:    /app/casual/services/register.service.ts
// author:  sjosephs
// date:    18/04/17

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Employer, User } from 'supplyworks';
import { API_EMPLOYER } from 'api-paths';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegisterService {

  constructor( private http: Http ) { }

  Register(employer: Employer, user: User):Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({'employer': employer, 'user': user});
    
    console.log('data: ' + data);
    return this.http.post(API_EMPLOYER.register, data, options)
      .toPromise()
      .then(resp => { 
        let result = resp.json();
        if(result.success) return Promise.resolve(result.data);
        else return Promise.reject('Error processing registration - ' + result.data);
      })
      .catch(err => { return Promise.reject(err); });
  }
}