import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { API_EMPLOYER } from 'api-paths';
import { User } from 'supplyworks';
import { EmployerService } from './employer.service';

import 'rxjs/add/operator/toPromise';

export enum LoginResult {
  success = 100,
  failed = 200,
  error = 999
}

@Injectable()
export class AuthenticationService {
  public token: string;
  public user: User;

  constructor(private http: Http, private employerService: EmployerService) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string): Promise<LoginResult> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({'headers': headers});
    let data = JSON.stringify({'email': email, 'password': password});

    return this.http.post(API_EMPLOYER.authenticate, data, options)
      .toPromise()
      .then((response) => {
        let json = response.json();
        let token = json.success && json.data.token;

        this.user = json.success && json.data.user;
        this.employerService.user = this.user;
        this.employerService.getEmployer();

        if(token && this.user.isAdmin) {
          this.token = token;
          localStorage.setItem('currentUser', data);
          return LoginResult.success;
        } else {
          return LoginResult.failed;
        }
      })
      .catch((err) => {
        console.error('An error occurred logging in: ' + JSON.stringify(err));
        return LoginResult.error;
      });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.token = null;
  }

  getAuthHeader(): RequestOptions {
    let headers = new Headers([{'Content-Type': 'application/json'},{'x-access-token': this.token}]);
    return new RequestOptions({'headers': headers});
  }

}
