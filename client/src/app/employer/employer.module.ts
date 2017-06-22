import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { MaterialModule }       from '@angular/material';
import { HttpModule }           from '@angular/http';

import { DebugService, ErrorService, RegisterService } from './services';
import { EmployerService, AuthenticationService, UserService } from './services';
import { AgreementService } from './services';
import { AuthGuard }  from './authguard/auth.guard';

import { EmployerComponent }  from './employer.component';
import { EmployerRoutingModule } from './employer-routing.module';
import { ErrorComponent } from './shared/error/error.component';

@NgModule({
  declarations: [
    ErrorComponent,
    EmployerComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [
    DebugService,
    ErrorService,
    RegisterService,
    EmployerService,
    AuthenticationService,
    UserService,
    AuthGuard,
    AgreementService
  ],
  entryComponents: [

  ]
})
export class EmployerModule { 
  constructor( private _debug: DebugService ) { this._debug.DebugEnabled = true; }
}
