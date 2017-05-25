import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { CommonModule }         from '@angular/common';
import { HttpModule }           from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule }       from '@angular/material';

import { ErrorService }           from './services';
import { RegisterService }        from './services';
import { EmployerService }        from './services';
import { AuthenticationService }  from './services';
import { UserService }            from './services';

import { AuthGuard }  from './authguard/auth.guard';

import { ErrorComponent }     from './error/error.component';
import { EmployerComponent }  from './employer.component';
import { RegisterComponent }  from './register/register.component';
import { LoginComponent }     from './login/login.component';
import { EditComponent }      from './edit/edit.component';
import { UsersComponent }     from './users/users.component';
import { UserDialogComponent }  from './users/user-dialog.component';

const routes: Routes = [
  { path: '', component: EmployerComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit', runGuardsAndResolvers:'always', canActivate:[AuthGuard], component: EditComponent },
  //{ path: 'users', component: UsersComponent },
  //{ path: 'users/edit', component: UserDialogComponent },
  //{ path: 'users/edit/:id', component: UserDialogComponent },
  { path: 'users', component: UsersComponent, children:[
      { path: 'edit', component: UserDialogComponent },
      { path: 'edit/:id', component: UserDialogComponent }
  ]}
]

@NgModule({
  declarations: [
    ErrorComponent,
    EmployerComponent,
    RegisterComponent,
    LoginComponent,
    EditComponent,
    UsersComponent,
    UserDialogComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot()
  ],
  providers: [
    ErrorService,
    RegisterService,
    EmployerService,
    AuthenticationService,
    UserService
  ]
})
export class EmployerModule { }

