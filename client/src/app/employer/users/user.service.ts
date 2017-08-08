import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { User } from 'types';
import { API_EMPLOYER } from 'api-paths'
import { AuthenticationService, DebugService } from '../services';

@Injectable()
export class UserService {

  constructor (
    private authService: AuthenticationService, 
    private http: Http,
    private _debug: DebugService
  ) { }

  public getUser(id: string): Observable<User> {
    return this.getUsers()
      .map(res => res.find(u => u._id === id));
  }

  public getUsers(employerId?: string): Observable<User[]> {
    let url = API_EMPLOYER.user;
    if(employerId) url = `${url}/${employerId}`;
    return this.http.get(url, this.authService.authHeader())
      .map((res: Response) => {
        let json = res.json();
        if(json.success) { return json.data; } else { throw Observable.throw(json.data); }
      })
      .catch((err: any) => Observable.throw(err.json().error || 'error loading users'));
  }

  public newUser(user: User): Observable<User> {
    return this.http.post(API_EMPLOYER.user, user, this.authService.authHeader())
      .map( res => {
        let json = res.json();
        if (json.success) {
          return json.data;
        } else {
          if (json.data && json.data.code) {
            if (json.data.code === 11000) { Observable.throw('A user with the same email address already exists'); }
            else { Observable.throw('An unknown error has occurred saving the user, ' + json.data.message); }
          } else { Observable.throw(json.data); }
        }
      })
      .catch(err => Observable.throw(err));
  }
  
  public newUserOld(user:User): Promise<User> {
    return this.http.post(API_EMPLOYER.user, user, this.authService.authHeader())
      .toPromise()
      .then(res => {
        let json = res.json();
        if(json.success) {
          return <User>json.data;
        } else {
          if(json.data && json.data.code) {
            if(json.data.code === 11000) 
              this.errorHandler('A user with the same email address already exists');
            else
              this.errorHandler('An unknown error has occurred saving the user, ' + json.data.message);
          } else {
            this.errorHandler(json.data);
          }
        }
      })
      .catch(err => this.errorHandler(err)) as Promise<User>;
  }

  public deleteUser(eeId:string, emId:string): Promise<boolean> {
    return this.http.delete(API_EMPLOYER.user + '/' + emId + '/' + eeId, this.authService.authHeader())
      .toPromise()
      .then(res => {
        let json = res.json();
        if(json.success != true) 
          this.errorHandler(json.data);
        else return true;
      })
      .catch(err => this.errorHandler(err)) as Promise<boolean>;
  }

  public editUser(user:User): Promise<boolean> {
    return this.http.put(API_EMPLOYER.user + '/' + user._id, user, this.authService.authHeader())
      .toPromise()
      .then(res => {
        let json = res.json();
        if(json.success)
          return json.data;
        else
          this.errorHandler(json.data);
      })
      .catch(err => this.errorHandler(err));
  }

  private errorHandler(error: any): void {
    let e = 'An error occurred in UserService: ' + (error.message || error);
    console.log(e);
    throw new Error(error.message||error);
  }

  debug(funcName:string,msg:string) {
    this._debug.log('user.service:' + funcName + ' - ' + msg);
  }
}