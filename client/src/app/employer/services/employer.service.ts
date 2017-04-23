import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User, Employer } from 'supplyworks';
import { API_EMPLOYER } from 'api-paths';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployerService {
  public user: User;
  public employer: Employer;

  constructor( private http: Http){ }

  public getEmployer(employerId?: string): Promise<Employer> {
    let empId = employerId || this.user._id;
    if(!empId) Promise.reject('no employer Id');
    return this.http.get(API_EMPLOYER.employer + '/' + empId)
      .toPromise()
      .then(res => {
        let json = res.json();
        this.employer = json.success && json.data
        console.log('got employer: ' + this.employer.name);
        return Promise.resolve(this.employer);
      })
      .catch(err => {
        console.log('darn it, EmployerService broke: ' + err);
        return Promise.reject(err);
      });
  }
}