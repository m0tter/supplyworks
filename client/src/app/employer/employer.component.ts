import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from './services';
import { EmployerService } from './services';
import { Employer } from 'supplyworks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit, OnDestroy {

  private _employerName: string;
  private _subscription: Subscription;
  private _employer: Employer;

  constructor(
    private authService: AuthenticationService,
    private empService: EmployerService
  ) { 
    this._subscription = this.empService.employer.subscribe(emp => { this._employer = emp; });
  }

  isLoggedIn(): boolean { 
    return this.authService.token && true;
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
  
  ngOnInit() { }

}
