import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { User, Employer, TableDataSource } from 'types';
import { UserService } from '../user.service';
import { EmployerService, ErrorService } from '../../services';
import { UserDialogComponent } from '../dialogs/user-dialog.component';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-employer-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  private _users: User[];
  private _user: User;
  private _error = '';
  private _data: TableDataSource<User>;
  private _waiting = false;

  constructor(
    private _errorService: ErrorService,
    private _empService: EmployerService,
    private _userService: UserService,
    private _location: Location,
    private _dialog: MdDialog,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = this._empService.employerId;
    this._waiting = true;
    if(id) {
      this._userService.getUsers(id)
        .subscribe(
          res => this._data = new TableDataSource<User>(res),
          err => this.errorHandler(err),
          () => this._waiting = false
        );
    } else {
      this.errorHandler('Employer ID is missing, unable to retrieve users');
    }
  }

  goBack():void {
    this._location.back();
  }

  edit(row: User): void {
    this._router.navigate([`../${row._id}`], { relativeTo: this._route });
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
