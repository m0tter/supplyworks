import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';
import { User, Employer } from 'types';
import { EmployerService, UserService, ErrorService } from '../services';
import { UserDialogComponent } from './dialogs/user-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog.component';

@Component({
  selector: 'employer-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
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
      this._userService.getUsers(id)
        .then(res => this._users = res)
        .catch(err => this.errorHandler(err));
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
      if(result) {
        this._userService.newUser(result)
          .then(savedUser => this._users.push(savedUser))
          .catch(err => this.errorHandler(err))
      }
    });
  }

  edit($index:number):void {
    let dialogRef = this._dialog.open(UserDialogComponent);
  }

  delete($idx:number):void {
    this._user = this._users[$idx];
    this.debug('delete','$idx=' + $idx);
    this.debug('delete', 'user id=' + this._user._id);
    let dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.setMessage('Are you sure you want to delete ' + this._user.name);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.debug('delete','result user id=' + this._user._id);
        this._userService.deleteUser(this._user._id)
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
   console.log('users.component:' + funcname + ' - ' + msg);
  }
}
