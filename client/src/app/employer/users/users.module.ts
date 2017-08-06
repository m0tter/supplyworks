import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserDialogComponent } from './dialogs/user-dialog.component';

import { ErrorModule } from '../shared/error/error.module';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ErrorModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    UsersComponent,
    UserDialogComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
