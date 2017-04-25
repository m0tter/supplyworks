import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  isLoggedIn(): boolean { if(this.authService.token) return this.authService.token && true; }

  logout(): void {
    this.authService.logout();
  }
  
  ngOnInit() {
  }

}
