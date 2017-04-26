import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { API_EMPLOYER } from 'api-paths';
import { User } from 'supplyworks';
import { EmployerService } from './employer.service';

import 'rxjs/add/operator/toPromise';

export enum LoginResult {
  success = 100,
  failed = 200,
  notAuthorised = 300,
  error = 0
}

@Injectable()
export class AuthenticationService {
  private _user: User;

  get token(): string { if(this._user && this._user.token) return this._user.token; else return null;}

  constructor(private http: Http, private employerService: EmployerService) {
    let local = localStorage.getItem('currentUser');
    if(local) {
      this._user = JSON.parse(local);
      this.employerService.employerId = this._user.employerId;
    }
  }

  login(email: string, password: string): Promise<LoginResult> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({'headers': headers});
    let data = JSON.stringify({'email': email, 'password': password});

    return this.http.post(API_EMPLOYER.authenticate, data, options)
      .toPromise()
      .then((response) => {
        let json = response.json();
        if(json.success){
          this._user = json.data.user as User;
          if(json.data.token){
            this._user.token = json.data.token;
            if(this._user.employerId && this._user.isAdmin) {
              localStorage.setItem('currentUser', JSON.stringify(this._user));
              this.employerService.employerId = this._user.employerId;
              return Promise.resolve(LoginResult.success);
            } else { return Promise.resolve(LoginResult.notAuthorised); }
          } else { return Promise.resolve(LoginResult.error); }
        } else { return Promise.resolve(LoginResult.failed); }
      })
      .catch((err) => {
        console.error('An error occurred logging in: ' + err);
        return LoginResult.error;
      });
  }

  logout(): void {
    this._user = null;
    localStorage.removeItem('currentUser');
  }
}
