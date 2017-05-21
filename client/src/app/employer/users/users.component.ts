import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, Employer } from 'types';
import { EmployerService, UserService } from '../services'

@Component({
  selector: 'employer-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private _users: User[];
  private _error = '';

  constructor(
    private empService: EmployerService,
    private userService: UserService
  ) { }

  ngOnInit() {
    let id = this.empService.employerId;
    this.debug('ngOnInit','im at the start');
    this.debug('ngOninit', "id=" + id);
    if(id) {
      this.debug('ngOninit', 'get emp id');
      this.userService.getUsers(id)
        .then(res => this._users = res)
        .catch(err => this.errorHandler(err));
    } else {
      this.errorHandler('Employer ID is missing, unable to retrieve users');
    }
  }

  errorHandler(msg: string): void {
    this._error = msg;
  }

  debug(modname,msg:string) {
    console.log('users.component:' + modname + ' - ' + msg);
  }
}
