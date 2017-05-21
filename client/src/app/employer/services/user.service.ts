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
        if(json.success) {
          return Promise.resolve(<User[]>json.data);
        } else {
          return Promise.reject(json.data);
        }
      })
      .catch(err => this.errorHandler(err));
  }

  private errorHandler(error: any): Promise<any> {
    let e = 'An error occurred in UserService: ' + (error.message || error);
    console.log(e);
    return Promise.reject(e);
  }

  debug(funcName:string,msg:string) {
    console.log('user.service:' + funcName + ' - ' + msg);
  }
}