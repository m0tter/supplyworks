import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { AgreementsComponent }      from './agreements.component';
import { NewAgreementComponent }    from './new/new-agreement.component';
import { ListAgreementsComponent }  from './list/list-agreements.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'new', component: NewAgreementComponent },
  { path: 'list', component: ListAgreementsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgreementsRoutingModule { }