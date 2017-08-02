import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { MaterialModule }       from '@angular/material';
import { HttpModule }           from '@angular/http';

import { DebugService, ErrorService, RegisterService } from './services';
import { EmployerService, AuthenticationService, UserService } from './services';
import { AuthGuard }          from './authguard/auth.guard';

import { EmployerComponent }      from './employer.component';
import { EmployerRoutingModule }  from './employer-routing.module';
import { ErrorModule }         from './shared/error/error.module';

import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog.component';

@NgModule({
  declarations: [
    EmployerComponent,
    ConfirmDialogComponent
  ],
  imports: [
    ErrorModule,
    CommonModule,
    EmployerRoutingModule,
    MaterialModule
  ],
  providers: [
    DebugService,
    ErrorService,
    RegisterService,
    EmployerService,
    AuthenticationService,
    UserService,
    AuthGuard
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class EmployerModule { 
  constructor( private _debug: DebugService ) { this._debug.DebugEnabled = true; }
}
