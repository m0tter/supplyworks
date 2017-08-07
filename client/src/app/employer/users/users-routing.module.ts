import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { UsersComponent } from './users.component';
// import { UserDialogComponent } from './dialogs/user-dialog.component';
import { ListUsersComponent } from './list/users-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: ListUsersComponent },
  { path: 'new', component: UserComponent },
  { path: ':id', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
