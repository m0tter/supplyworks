import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from 'types';
import { API_EMPLOYER } from 'api-paths'
import { AuthenticationService, DebugService } from './';

@Injectable()
export class UserService {

  constructor (
    private authService: AuthenticationService, 
    private http: Http,
    private _debug: DebugService
  ) { }
  
  public getUsers(empId?: string): Promise<User[]> {
    let url = API_EMPLOYER.user;
    if(empId) url = `${url}/${empId}`;
    return this.http.get(url , this.authService.authHeader())
      .toPromise()
      .then(res => {
        let json = res.json();
        if(json.success)
          return <User[]>json.data;
        this.errorHandler(json.data);
      })
      .catch(err => this.errorHandler(err)) as Promise<User[]>;
  }

  public newUser(user:User): Promise<User> {
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