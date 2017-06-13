import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { User } from 'types';
import { EmployerService, UserService } from '../../services'

@Component({
  selector: 'employer-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  private _newUser = true;
  private _saving = false;
  public userForm: FormGroup;
  public user: User;

  constructor(
    private dialogRef: MdDialogRef<UserDialogComponent>,
    private formBuilder: FormBuilder
  ) { }

  buildForm() {
    this.userForm = this.formBuilder.group({
      firstName:  [this.user.firstName, Validators.required],
      lastName:   [this.user.lastName, Validators.required],
      email:      [this.user.email, Validators.required],
      mobile:     [this.user.mobilePhone, Validators.required],
      password: '',
      isAdmin: '',
      canEdit: ''
    });
  }

  ngOnInit() {
    if(this.user) this._newUser = false;
    else this.user = new User();
    this.buildForm();
  }

  save() {
    if(this.userForm.dirty && this.userForm.valid) {
      let formModel = this.userForm.value;
      this.user.email = formModel.email;
      this.user.firstName = formModel.firstName;
      this.user.lastName = formModel.lastName;
      this.user.mobilePhone = formModel.mobile;
      this.user.password = formModel.password;
      this.user.isAdmin = formModel.isAdmin;

      this.dialogRef.close(this.user);
    }
  }
}

/*
  doRegister(): void {
    this.registering = true;
    if(this.registerForm.dirty && this.registerForm.valid) {
      const formModel = this.registerForm.value;
      this.employer.name = formModel.name;
      this.adminUser = formModel.user;
      this.employer.address[0] = formModel.address;

      this.registerService.Register(this.employer, this.adminUser)
        .then(res => { this.result = JSON.stringify(res); this.registering = false; })
        .catch( err => { this.result = err; this.registering = false; });
    }
  }
  */