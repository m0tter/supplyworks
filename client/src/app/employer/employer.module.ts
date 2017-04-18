import { NgModule }  from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { RegisterService } from './services';

import { EmployerComponent } from './employer.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: EmployerComponent },
  { path: 'register', component: RegisterComponent }
]

@NgModule({
  declarations: [
    EmployerComponent,
    RegisterComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot()
  ],
  providers: [
    RegisterService
  ]
})
export class EmployerModule { }

