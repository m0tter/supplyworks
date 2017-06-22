import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomeModule' },
  { path: 'casual', loadChildren: './casual/casual.module#CasualModule' },
  { path: 'employer', loadChildren: './employer/employer.module#EmployerModule' },
  { path: 'employee', loadChildren: './employee/employee.module#EmployeeModule' },
  { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
