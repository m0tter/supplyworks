import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Employer } from 'supplyworks';

import { AuthenticationService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loggingIn = false;

  constructor(private formBuilder: FormBuilder, private loginService: AuthenticationService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm():void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doLogin(): void {
    this.loggingIn = true;
    if(this.loginForm.dirty && this.loginForm.valid) {
      const form = this.loginForm.value;
    }
  }
}
