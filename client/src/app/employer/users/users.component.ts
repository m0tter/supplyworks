import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';
import { User, Employer } from 'types';
import { EmployerService, UserService, ErrorService } from '../services';
import { UserDialogComponent } from './dialogs/user-dialog.component';
import { ConfirmDialogComponent } from '../shared/dialogs/confirm-dialog.component';

@Component({
  selector: 'employer-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private _errorService: ErrorService,
  ) { }

  ngOnInit(): void { }

  errorHandler(msg: string): void {
    this._errorService.errorHandler(msg);
  }

  debug(funcname:string,msg:string) {
  // console.log('users.component:' + funcname + ' - ' + msg);
  }
}
