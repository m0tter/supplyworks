import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {  
  MdTableModule, 
  MdInputModule, 
  MdSelectModule, 
  MdButtonModule,
  MdCheckboxModule,
  MdDialogModule,
  MdSlideToggleModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserDialogComponent } from './dialogs/user-dialog.component';
import { UsersListComponent } from './list/users-list.component';
import { UserComponent } from './user/user.component';

import { ErrorModule } from '../shared/error/error.module';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ErrorModule,
    ReactiveFormsModule,
    MdTableModule,
    MdInputModule,
    MdSelectModule,
    MdButtonModule,
    MdCheckboxModule,
    MdDialogModule,
    CdkTableModule,
    MdSlideToggleModule
  ],
  declarations: [
    UsersComponent,
    UserDialogComponent,
    UsersListComponent,
    UserComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
