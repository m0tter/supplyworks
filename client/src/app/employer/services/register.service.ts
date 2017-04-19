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

  Register(employer: Employer, user: User):Promise<Employer> {
    var data = {'employer': employer, 'user': user};
    return this.http.post(API_EMPLOYER['register'], data)
      .toPromise()
      .then(resp => { return resp.json().data as Employer });
  }
}