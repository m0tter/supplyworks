import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerComponent } from './employer.component';
import { AuthGuard } from './authguard/auth.guard';;

//const routes: Routes = [
//  { path: '', component: EditComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' }
//]

const routes: Routes = [
  { path: '', component: EmployerComponent },
  { path: 'register', loadChildren: './register/register.module#RegisterModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'edit', canActivate: [AuthGuard], runGuardsAndResolvers: 'always', loadChildren: './edit/edit.module#EditModule' },
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
  { path: 'agreements', canActivate: [AuthGuard], runGuardsAndResolvers: 'always', loadChildren: './agreements/agreements.module#AgreementsModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
