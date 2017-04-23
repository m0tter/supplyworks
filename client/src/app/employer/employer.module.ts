import { NgModule }  from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { RegisterService } from './services';
import { EmployerService } from './services';
import { AuthenticationService } from './services';
import { EditService } from './services';

import { EmployerComponent } from './employer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component: EmployerComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: EditComponent }
]

@NgModule({
  declarations: [
    EmployerComponent,
    RegisterComponent,
    LoginComponent,
    EditComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot()
  ],
  providers: [
    RegisterService,
    EmployerService,
    AuthenticationService
  ]
})
export class EmployerModule { }

