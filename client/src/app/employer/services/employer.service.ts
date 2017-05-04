import { Injectable } from '@angular/core';
import { Http, Headers, ResponseOptions } from '@angular/http';
import { User, Employer } from 'supplyworks';
import { API_EMPLOYER } from 'api-paths';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

// export class Employer {
//   name: string;
//   address: string;
//   contactId: string;
//   casualId: string;
//   employeeId: string;
//   _id?: string;
// }

@Injectable()
export class EmployerService {
  private _initialEmployer: Employer = {address: [], casualId: [], contactId: '', employeeId: [], name: ''};
  private _employer: BehaviorSubject<Employer> = new BehaviorSubject<Employer>(this._initialEmployer);
  private _employerId: string;

  set employerId(id: string) {
    this._employerId = id;
    this.getEmployer();
  }

  public readonly employer: Observable<Employer> = this._employer.asObservable();

  constructor(private http: Http) { }

  public getEmployer(empId?: string) {
    let id = empId || this._employerId;
    if(id) {
      this.http.get(API_EMPLOYER.employer + '/' + id, this.authHeader())
        .toPromise()
        .then(res => {
          let json = res.json();
          if(json.success) this._employer.next(json.data);
          else {
            this.errorHandler(json.data);
            return Promise.reject('error loading employer, please check server logs');
          }
        })
        .catch(err => this.errorHandler(err))
    } else console.log('no ID');
  }

  public logout() {
    this._employer.next(this._initialEmployer);
  }

  private errorHandler(error: any): Promise<any> {
    console.error('error in employer.service: ', error.message || error);
    return Promise.reject(error || 'darn it, EmployerService broke');
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