import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgreementsComponent } from './agreements.component';

const routes: Routes = [
  { path: '', component: AgreementsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgreementsRoutingModule { }