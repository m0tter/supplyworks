import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services';
import { EmployerService } from './services';
import { Employer } from 'supplyworks';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {

  private _employerName: string;
  private _employer: Employer;

  constructor(
    private authService: AuthenticationService,
    private empService: EmployerService
  ) { }

  isLoggedIn(): boolean { 
    if(this.authService.token) {
     // this.empService.employer.subscribe(data => this._employer = data);
      return true;
    } else return false;
  }

  logout(): void {
    this.authService.logout();
  }
  
  ngOnInit() {
    //this.empService.employer.subscribe(data => this._employer = data);
    //if(this.empService.employer) this._employerName = this.empService.employer.name;
  }

}
