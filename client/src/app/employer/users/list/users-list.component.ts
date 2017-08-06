import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';

import { User, Employer } from 'types';
import { UserService } from '../user.service';
import { EmployerService, ErrorService } from '../../services';
import { UserDialogComponent } from '../dialogs/user-dialog.component';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-employer-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersComponent implements OnInit {
  private _users: User[];
  private _user: User;
  private _error = '';

  constructor(
    private _errorService: ErrorService,
    private _empService: EmployerService,
    private _userService: UserService,
    private _location: Location,
    private _dialog: MdDialog
  ) { }

  ngOnInit() {
    let id = this._empService.employerId;
    if(id) {
      this._userService.getUsersNew(id)
        .subscribe(
          res => this._users = res,
          err => this.errorHandler(err)
        );
    } else {
      this.errorHandler('Employer ID is missing, unable to retrieve users');
    }
  }

  goBack():void {
    this._location.back();
  }

  newUser():void {
    let dialogRef = this._dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      let user = <User>result;
      if(user) {
        user.employerId = this._empService.employerId;
        this._userService.newUser(result)
          .then(savedUser => this._users.push(savedUser))
          .catch(err => this.errorHandler(err))
      }
    });
  }

  edit($index:number):void {
    let copy = JSON.parse(JSON.stringify(this._users[$index]));
    let dialogRef = this._dialog.open(UserDialogComponent);
    dialogRef.componentInstance.user = copy;
    dialogRef.afterClosed().subscribe(result => {
      let user = <User>result;
      if(user) {
        this._userService.editUser(user)
          .then(result => this._users.splice($index, 1, user))
          .catch(err => this.errorHandler(err))
      }
    });
  }

  delete($idx:number):void {
    this._user = this._users[$idx];
    let dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.setMessage(
      'Are you sure you want to delete ' + this._user.firstName + ' ' + this._user.lastName);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this._userService.deleteUser(this._user._id, this._empService.employerId)
          .then(res => { 
            if(res) this._users.splice($idx, 1); 
            else 
              this._errorService.errorHandler('There was an error deleting the user'); })
          .catch(err => this.errorHandler(err));
      }
    });
  }

  errorHandler(msg: string): void {
    this._errorService.errorHandler(msg);
  }

  debug(funcname:string,msg:string) {
  // console.log('users.component:' + funcname + ' - ' + msg);
  }
}
