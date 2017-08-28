import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
// import { UserDialogComponent } from './dialogs/user-dialog.component';
import { UsersListComponent } from './list/users-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: UsersListComponent },
  { path: 'new', component: UserComponent },
  { path: ':id', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
