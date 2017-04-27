import { Injectable } from '@angular/core';
import { Http, Headers, ResponseOptions } from '@angular/http';
import { User, Employer } from 'supplyworks';
import { API_EMPLOYER } from 'api-paths';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployerService {
  private _employerId: string;
  private _employer: Employer;
  public user: User;

  set employerId(id: string) {
    this._employerId = id;
    this.getEmployer(id);
  }

  get employer(): Observable<Employer> {
    if(this._employer) return new Observable(observer => { observer.next(this._employer); }); else return null;
  }

  constructor( private http: Http){ }

  public getEmployer(employerId?: string): Promise<Employer> {
    let empId = employerId || this._employerId;
    if(!empId) Promise.reject('no employer Id');
    return this.http.get(API_EMPLOYER.employer + '/' + empId, this.authHeader())
      .toPromise()
      .then(res => {
        let json = res.json();
        this._employer = json.success && json.data
        return Promise.resolve(this._employer);
      })
      .catch(err => {
        console.log('darn it, EmployerService broke: ' + err);
        return Promise.reject(err);
      });
  }

  public save(employer?: Employer): Promise<Employer> {
    let emp = employer || this._employer;
    if(!emp) Promise.reject('no employer');
    return this.http.put(API_EMPLOYER.employer + '/' + emp._id, JSON.stringify(emp), this.authHeader())
      .toPromise()
      .then(res => {
        let json = res.json();
        this._employer = json.success && json.data;
        return Promise.resolve(this._employer);
      })
      .catch(err => {
        console.log('oh gosh, EmployerService broken on save: ' + err);
        return Promise.reject(err);
      })
  }

  private authHeader(): ResponseOptions {
    let user:User = JSON.parse(localStorage.getItem('currentUser'));
    if(user.token) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', user.token);
      return new ResponseOptions({'headers': headers});
    } else {
      throw new Error('auth token missing');
    }
  } 
}