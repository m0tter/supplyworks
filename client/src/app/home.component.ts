import { Component } from '@angular/core';

@Component({
  selector: 'home',
  template: `<p>home</p>
    <a routerLink="/casual">Casual</a>
    <a routerLink="/employer">Employer</a>
    <a routerLink="/employee">Employee</a>
  `
})
export class HomeComponent { }