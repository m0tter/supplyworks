import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employer, User, Address } from 'supplyworks';

import { RegisterService } from '../services'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public employer:  Employer;
  public adminUser: User;
  public address: Address;
  public registerForm: FormGroup;
  public registering = false;
  public result = '';

  constructor( private fb: FormBuilder, private registerService: RegisterService ) {
    this.employer = {name: '', address: [], contactId: '', employeeId: [], casualId: []};
    this.adminUser = {email: '', firstName: '', employerId: '', isAdmin: true, lastName: '', mobilePhone: '', password: ''};
    this.address = {country: '', line1: '', line2: '', state: '', suburb: ''};
    this.buildForm();
   }

  buildForm(): void {
    this.registerForm = this.fb.group({
    schoolName:   [this.employer.name, Validators.required],
    firstName:    [this.adminUser.firstName, Validators.required],
    lastName:     [this.adminUser.lastName, Validators.required],
    email:        [this.adminUser.email, Validators.required],
    password:     [this.adminUser.password, Validators.required],
    phone:        [this.adminUser.mobilePhone, Validators.required],
    addrLine1:    [this.address.line1],
    addrLine2:    [this.address.line2],
    suburb:       [this.address.suburb]
    });
  }

  doRegister(): void {
    this.registering = true;
    if(this.registerForm.dirty && this.registerForm.valid) {
      this.registerService.Register(this.employer, this.adminUser)
        .then(res => { this.result = res; })
        .catch( err => { this.result = 'Error: ' + err });
    }
  }

  ngOnInit() {
  }

}
