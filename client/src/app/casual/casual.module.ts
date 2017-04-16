import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { HttpModule }     from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.comp';
import { CasualAppComponent } from './casual.comp';

const routes: Routes = [
  { path: '', component: CasualAppComponent },
  { path: 'register', component: RegisterComponent }
]

@NgModule({
  declarations: [
    CasualAppComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class CasualModule { }
