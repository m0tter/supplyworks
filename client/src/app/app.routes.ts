import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'casual', loadChildren: 'app/casual/casual.module#CasualModule' },
  { path: 'employer', loadChildren: 'app/employer/employer.module#EmployerModule' },
  { path: 'employee', loadChildren: 'app/employee/employee.module#EmployeeModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
