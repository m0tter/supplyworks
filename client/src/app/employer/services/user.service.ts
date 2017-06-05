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
  
  public getUsers(empId: string): Promise<User[]> {
    return this.http.get(API_EMPLOYER.user + '/' + empId , this.authService.authHeader())
      .toPromise()
      .then(res => {
        let json = res.json();
        if(json.success)
          return <User[]>json.data;
        this.errorHandler(json.data);
      })
      .catch(err => this.errorHandler(err));
  }

  public newUser(user:User): Promise<User> {
    return this.http.post(API_EMPLOYER.user, user, this.authService.authHeader())
      .toPromise()
      .then(res => {
        let json = res.json();
        if(json.success)
          return <User>json.data;
        this.errorHandler(json.data);
      })
      .catch(err => this.errorHandler(err));
  }

  public deleteUser(id:string): Promise<boolean> {
    return this.http.delete(API_EMPLOYER.user + '/' + id, this.authService.authHeader())
      .toPromise()
      .then(res => {
        let json = res.json();
        if(json.success != true) 
          this.errorHandler(json.data);
        else return true;
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