import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserDialogComponent } from './dialogs/user-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    UserDialogComponent
  ]
})
export class UsersModule { }
