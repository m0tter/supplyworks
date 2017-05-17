import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from './services';
import { EmployerService } from './services';
import { Employer } from '../_types';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit, OnDestroy {

  private _employerName: string;
  private _employer: Employer;
  private _subs: Subscription = new Subscription();
  private _isLoggedIn: Boolean;

  constructor(
    private authService: AuthenticationService,
    private empService: EmployerService
  ) { }


  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
  
  ngOnInit() {
    this._subs.add(this.empService.employer.subscribe(res => this._employer = res, err => this.errorHandler(err)));
    this._subs.add(this.authService.isLoggedIn.subscribe(res => this._isLoggedIn = res));
  }

  errorHandler(error: any) {
    console.error('error in employer.component: ', error.message || error);
  }

}
