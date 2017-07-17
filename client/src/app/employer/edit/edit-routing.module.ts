import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComponent } from './edit.component';
import { AuthGuard } from '../authguard/auth.guard';;

const routes: Routes = [
  { path: '', component: EditComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }