import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from 'types';
import { API_EMPLOYER } from 'api-paths'
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {

  constructor (
    private authService: AuthenticationService, 
    private http: Http
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

  public deleteUser(user:User): Promise<boolean> {
    return this.http.delete(API_EMPLOYER.user + '/' + user._id, this.authService.authHeader())
      .toPromise()
      .then(res => res.json().success)
      .catch(err => this.errorHandler(err));
  }

  private errorHandler(error: any): void {
    let e = 'An error occurred in UserService: ' + (error.message || error);
    console.log(e);
    throw new Error(e);
  }

  debug(funcName:string,msg:string) {
    console.log('user.service:' + funcName + ' - ' + msg);
  }
}