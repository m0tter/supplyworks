import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user.service';
import { User } from 'types';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private _newUser = false;
  private _user: User;

  constructor(
    private __service: UserService,
    private __route: ActivatedRoute
  ) { }

  buildForm() { }

  ngOnInit() {
    this.__route.params
      .switchMap(params => {
        if (params['id']) {
          return this.__service.getUser(params['id']);
        } else {
          this._newUser = true;
          return Observable.of(new User());
        }
      })
      .subscribe(res => {
        this._user = res;
        this.buildForm();
      });
    this.buildForm();
   }
}