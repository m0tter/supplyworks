import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { AgreementsComponent }      from './agreements.component';
import { NewAgreementComponent }    from './new/new-agreement.component';
import { ListAgreementsComponent }  from './list/list-agreements.component';
import { AgreementComponent }       from './agreement/agreement.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'new', component: AgreementComponent },
  { path: 'list', component: ListAgreementsComponent },
  { path: ':id', component: AgreementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgreementsRoutingModule { }