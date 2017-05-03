import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from './services';
import { EmployerService } from './services';
import { Employer } from 'supplyworks';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit, OnDestroy {

  private _employerName: string;
  private _employer: Employer;

  constructor(
    private authService: AuthenticationService,
    private empService: EmployerService
  ) { 
  }

  isLoggedIn(): boolean { 
    return this.authService.token && true;
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    
  }
  
  ngOnInit() {
    //if(this.empService.employerId) {
    this.empService.getEmployerNew()
      .map(res => this._employer = res)
      .catch(err => Observable.throw(err))
      .subscribe();
   // }
  }

}
