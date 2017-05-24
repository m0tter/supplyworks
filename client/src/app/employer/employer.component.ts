import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from './services';
import { EmployerService } from './services';
import { ErrorService } from './services';
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
  private _error: string;

  constructor(
    private _authService: AuthenticationService,
    private _empService: EmployerService,
    private _errorService: ErrorService
  ) { }


  logout(): void {
    this._authService.logout();
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
  
  ngOnInit() {
    this._subs.add(this._errorService.error.subscribe(res => this._error = res));
    this._subs.add(this._empService.employer.subscribe(res => this._employer = res));
    this._subs.add(this._authService.isLoggedIn.subscribe(res => this._isLoggedIn = res));
  }

  errorHandler(error: any) {
    this._errorService.errorHandler(
      'error in employer.component: ' + (error.message || error)
    );
  }

}
