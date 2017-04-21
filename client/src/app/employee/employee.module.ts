import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { EmployeeComponent } from './employee.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [
    RegisterComponent, 
    EmployeeComponent, LoginComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class EmployeeModule { }