import { Injectable } from '@angular/core';
import { Http, Headers, ResponseOptions } from '@angular/http';
import { User, Employer } from 'supplyworks';
import { API_EMPLOYER } from 'api-paths';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()
export class EmployerService {
  private _employerId: string;
  public _employer: Observable<Employer>;
  public user: User;

  set employerId(id: string) {
    this._employerId = id;
    this.getEmployer(id);
  }

  get employer(): Observable<Employer> {
    if(!this._employer) {
      this._employer = this.getEmployer();
    }
    return this._employer;
  }

  constructor( private http: Http){ 
    //let blank = {name:'', address:[], contactId: '', casualId: [], employeeId: []};
    //this._employer = this.getEmployer(); 
  }

  // public getEmployerPromise(employerId?: string): Promise<Employer> {
  //   let empId = employerId || this._employerId;
  //   if(!empId) Promise.reject('no employer Id');
  //   return this.http.get(API_EMPLOYER.employer + '/' + empId, this.authHeader())
  //     .toPromise()
  //     .then(res => {
  //       let json = res.json();
  //       this._employer = json.success && json.data
  //       return Promise.resolve(this._employer);
  //     })
  //     .catch(err => {
  //       console.log('darn it, EmployerService broke: ' + err);
  //       return Promise.reject(err);
  //     });
  // }

  public getEmployer(employerId?: string): Observable<Employer> {
    let empId = employerId || this._employerId;
    console.log('got here');
    if(!empId) {
      console.log('had no id');
      let blank:Employer = {name:'', address:[], contactId: '', casualId: [], employeeId: []}
      return Observable.of(blank);
    }

    console.log('got id: ', empId);
    return this.http.get(API_EMPLOYER.employer + '/' + empId, this.authHeader())
      .do(() => console.log('you whooo'))
      .map(res => { let data = res.json().data; this._employer.name = data.name; })
      .do(data => console.log('employer.service: ', data.name))
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
    let blank: Employer = {name:'', address:[], contactId: '', casualId: [], employeeId: []}
    this._employer = Observable.of(blank);
  }

  private errorHandler(error: any): Observable<any> {
    console.error(error);
    return Observable.throw(error.json().error || 'darn it, EmployerService broke');
  }

  private authHeader(): ResponseOptions {
    console.log('now Im here');
    let user:User = JSON.parse(localStorage.getItem('currentUser'));
    if(user.token) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', user.token);
      console.log('returning da token');
      return new ResponseOptions({'headers': headers});
    } else {
      console.log('oh no');
      throw new Error('auth token missing');
    }
  } 
}