import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from './services';
import { EmployerService } from './services';
import { Employer } from 'supplyworks';
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

  constructor(
    private authService: AuthenticationService,
    private empService: EmployerService
  ) { 
  }

  isLoggedIn(): boolean { 
    return this.authService.token && true;
  }

  update() {
    this.empService.getEmployer();
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
  
  ngOnInit() {
    this._subs.add(this.empService.employer.subscribe(res => this._employer = res, err => this.errorHandler(err)));
  }

  errorHandler(error: any) {
    console.error('error in employer.component: ', error.message || error);
  }

}
