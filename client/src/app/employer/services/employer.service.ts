import { Injectable } from '@angular/core';
import { Http, Headers, ResponseOptions } from '@angular/http';
import { User, Employer } from 'supplyworks';
import { API_EMPLOYER } from 'api-paths';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()
export class EmployerService {
  private _empl: Employer;
  private _emplSubject = new BehaviorSubject<
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

  public getEmployerNew(employerId?: string): Observable<Employer> {

    let empId = employerId || this._employerId;
    if(!empId || empId === '0') {
      // return Observable.throw('Could not get employer, no employer ID');
      return Observable.of(null);
    }
    return this.http.get(API_EMPLOYER.employer + '/' + empId, this.authHeader())
      .map(res => {
        let json = res.json();
        if(json.success) return json.data; 
        else return this.errorHandler('error getting employer, please check server logs');
      })
      .catch(err => this.errorHandler(err));
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
    this.getEmployerNew('0');
  }

  private errorHandler(error: any): Observable<any> {
    console.error('error in employer.service: ', error.message || error);
    return Observable.throw(error || 'darn it, EmployerService broke');
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