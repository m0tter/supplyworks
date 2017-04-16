import { NgModule }  from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

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
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class EmployerModule { }

