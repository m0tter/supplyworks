import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'types';
import { EmployerService, UserService } from '../services'

@Component({
  selector: 'employer-useredit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}