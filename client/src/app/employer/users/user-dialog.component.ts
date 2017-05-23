import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { User } from 'types';
import { EmployerService, UserService } from '../services'

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
      password: '',
      isAdmin: '',
      canEdit: ''
    });
  }

  ngOnInit() {
    this.buildForm();
  }
}