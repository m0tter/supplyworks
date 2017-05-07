import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, ResponseOptions } from '@angular/http';
import { User, Employer } from 'supplyworks';
import { API_EMPLOYER } from 'api-paths';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthenticationService } from './';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployerService implements OnDestroy{
  private _initialEmployer: Employer = {address: [], casualId: [], contactId: '', employeeId: [], name: ''};
  private _employer: BehaviorSubject<Employer> = new BehaviorSubject<Employer>(this._initialEmployer);
  private _employerId: string;
  private _sub = new Subscription();

  set employerId(id: string) {
    this._employerId = id;
    this.getEmployer();
  }

  public readonly employer: Observable<Employer> = this._employer.asObservable();

  constructor(private http: Http, private authService: AuthenticationService) {
    this._sub.add(this.authService.user.subscribe(
      res => this.employerId = res.employerId,
      err => this.errorHandler(err)
    ));
   }

  public getEmployer(empId?: string) {
    let id = empId || this._employerId;
    if(id) {
      this.http.get(API_EMPLOYER.employer + '/' + id, this.authService.authHeader())
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
    } else this._employer.next(this._initialEmployer);
  }

  public logout() {
    this._employer.next(this._initialEmployer);
  }

  private errorHandler(error: any): Promise<any> {
    console.error('error in employer.service: ', error.message || error);
    return Promise.reject(error || 'darn it, EmployerService broke');
  }

  public ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
