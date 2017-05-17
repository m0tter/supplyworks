import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employer, User } from '../../_types';

import { AuthenticationService, LoginResult } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loggingIn = false;
  public error = '';

  constructor(
    private formBuilder: FormBuilder, 
    private loginService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm():void {
    this.loginForm = this.formBuilder.group({
      email:    ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  lostPassword(): void {
    console.log('lostPassword()');
  }

  doLogin(): void {
    this.loggingIn = true;
    if(this.loginForm.dirty && this.loginForm.valid) {
      const form = this.loginForm.value;
      this.loginService.login(form.email, form.password)
        .then(result => {
          this.loggingIn = false;
          if(result === LoginResult.success) {
            this.router.navigate(['/employer']);
          }
          else if(result === LoginResult.failed) { 
            this.error = 'Username or password incorrect';
            this.loginForm.patchValue({'password': ''});
          }
          else if(result === LoginResult.error) {
            this.error = 'A server error occurred, please try again';
          }
          else {
            this.error = 'An unspecified error occurred, please try again';
          }
        })
        .catch(err => {
          this.error = 'An error occurred processing the request: ' + err;
          this.loggingIn = false;
        });
    }
  }
}
