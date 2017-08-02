import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {  
  MdTableModule, 
  MdInputModule, 
  MdSelectModule, 
  MdButtonModule,
  MdCheckboxModule,
  MdDialogModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

import { AgreementsRoutingModule } from './agreements-routing.module';
import { AgreementsComponent } from './agreements.component';
import { ListAgreementsComponent } from './list/list-agreements.component';
import { AgreementComponent } from './agreement/agreement.component';

import { ErrorModule } from '../shared/error/error.module';

import { AgreementService } from './agreement.service';

@NgModule({
  imports: [
    ErrorModule,
    CommonModule,
    ReactiveFormsModule,
    MdTableModule,
    MdInputModule,
    MdSelectModule,
    MdButtonModule,
    MdCheckboxModule,
    MdDialogModule,
    AgreementsRoutingModule,
    CdkTableModule
  ],
  declarations: [
    AgreementsComponent,
    ListAgreementsComponent,
    AgreementComponent
  ],
  providers: [ AgreementService ]
})
export class AgreementsModule { }
