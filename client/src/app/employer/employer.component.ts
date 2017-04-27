import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services';
import { EmployerService } from './services';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {

  private _employerName: string;

  constructor(
    private authService: AuthenticationService,
    private empService: EmployerService
  ) { }

  isLoggedIn(): boolean { return this.authService.token && true; }

  logout(): void {
    this.authService.logout();
  }
  
  ngOnInit() {
    if(this.empService.employer) this._employerName = this.empService.employer.name;
  }

}
