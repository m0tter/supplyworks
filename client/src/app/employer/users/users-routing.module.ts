import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserDialogComponent } from './dialogs/user-dialog.component';
import { AuthGuard } from '../authguard/auth.guard';

const routes: Routes = [
  { path: '', 
    component: UsersComponent, 
    canActivate: [AuthGuard], 
    runGuardsAndResolvers: 'always', 
    children: [
      { path: 'edit', component: UserDialogComponent },
      { path: 'edit/:id', component: UserDialogComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
