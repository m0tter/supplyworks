import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { API_EMPLOYER } from 'api-paths';
import { User } from 'supplyworks';
import { BehaviorSubject, Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';

export enum LoginResult {
  success = 100,
  failed = 200,
  notAuthorised = 300,
  error = 0
}

@Injectable()
export class AuthenticationService {
  private _initialUser: User = {email: '', employerId: '', firstName : '', isAdmin: false, lastName: '', mobilePhone: '',password: ''};
  private _user: BehaviorSubject<User> = new BehaviorSubject<User>(this._initialUser);
  private _isLoggedIn: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public readonly user: Observable<User> = this._user.asObservable();
  public readonly isLoggedIn: Observable<Boolean> = this._isLoggedIn.asObservable();

  constructor(private http: Http) {
    let local = localStorage.getItem('currentUser');
    if(local) {
      localStorage.removeItem('currentUser');
      // this._user.next(JSON.parse(local));
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
          let u:User;
          u = json.data.user;
          if(json.data.token){
            u.token = json.data.token;
            if(u.employerId && u.isAdmin) {
              localStorage.setItem('currentUser', JSON.stringify(u));
              this._user.next(u);
              this._isLoggedIn.next(true);
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
    this._user.next(this._initialUser);
    this._isLoggedIn.next(false);
    localStorage.removeItem('currentUser');
  }

  public authHeader(): RequestOptions {
    let user = this._user.getValue();
    if(user) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', user.token);
      return new RequestOptions({'headers': headers});
    } else {
      throw new Error('auth token missing');
    }
  } 
}
