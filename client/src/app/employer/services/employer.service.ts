import { Injectable } from '@angular/core';
import { Http, Headers, ResponseOptions } from '@angular/http';
import { User, Employer } from 'supplyworks';
import { API_EMPLOYER } from 'api-paths';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()
export class EmployerService {
  private _employerId: string;
  private _employer = new Subject<Employer>();
  public user: User;

  set employerId(id: string) {
    this._employerId = id;
    this.getEmployer(id);
  }

  get employer(): Observable<Employer> {
    return this._employer.asObservable();
  }

  constructor( private http: Http) { }

  public getEmployer(employerId?: string):void {
    let empId = employerId || this._employerId;

    if(!empId) {
      this._employer.next();
    } else {
      this.http.get(API_EMPLOYER.employer + '/' + empId, this.authHeader())
        .toPromise()
        .then(res => this._employer.next(res.json().data))
        .catch(err => this.errorHandler(err));
    }
  }

  public save(employer?: Employer): Promise<Employer> {
    let emp = employer || this._employer;
    if(!emp) Promise.reject('no employer');
    return Promise.reject('not implemented');
    // return this.http.put(API_EMPLOYER.employer + '/' + emp._id, JSON.stringify(emp), this.authHeader())
    //   .toPromise()
    //   .then(res => {
    //     let json = res.json();
    //     this._employer = json.success && json.data;
    //     return Promise.resolve(this._employer);
    //   })
    //   .catch(err => {
    //     console.log('oh gosh, EmployerService broken on save: ' + err);
    //     return Promise.reject(err);
    //   })
  }

  public logout(): void {
    this._employer.next();    
  }

  private errorHandler(error: any): Observable<any> {
    console.error(error);
    return Observable.throw(error.json().error || 'darn it, EmployerService broke');
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