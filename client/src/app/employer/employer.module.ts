import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { CommonModule }         from '@angular/common';
import { HttpModule }           from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule }       from '@angular/material';

import { RegisterService }        from './services';
import { EmployerService }        from './services';
import { AuthenticationService }  from './services';
import { UserService }            from './services';

import { EmployerComponent }  from './employer.component';
import { RegisterComponent }  from './register/register.component';
import { LoginComponent }     from './login/login.component';
import { EditComponent }      from './edit/edit.component';
import { UsersComponent }     from './users/users.component';
import { UserEditComponent }  from './users/user-edit.component';

const routes: Routes = [
  { path: '', component: EmployerComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: EditComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/edit', component: UserEditComponent },
  { path: 'users/edit/:id', component: UserEditComponent }
]

@NgModule({
  declarations: [
    EmployerComponent,
    RegisterComponent,
    LoginComponent,
    EditComponent,
    UsersComponent,
    UserEditComponent
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
    AuthenticationService,
    UserService
  ]
})
export class EmployerModule { }

