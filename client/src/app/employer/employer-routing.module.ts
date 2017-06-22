import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerComponent } from './employer.component';

const routes: Routes = [
  { path: '', component: EmployerComponent },
  { path: 'register', loadChildren: './register/register.module#RegisterModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'edit', loadChildren: './edit/edit.module#EditModule' },
  { path: 'users', loadChildren: './users/users.module#UsersModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
