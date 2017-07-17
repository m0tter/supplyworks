import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdTableModule, MdInputModule, MdSelectModule, MdButtonModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

import { AgreementsRoutingModule } from './agreements-routing.module';
import { AgreementsComponent } from './agreements.component';
import { NewAgreementComponent } from './new/new-agreement.component';
import { ListAgreementsComponent } from './list/list-agreements.component';
import { ErrorModule } from '../shared/error/error.module';

@NgModule({
  imports: [
    ErrorModule,
    CommonModule,
    ReactiveFormsModule,
    MdTableModule,
    MdInputModule,
    MdSelectModule,
    MdButtonModule,
    AgreementsRoutingModule,
    CdkTableModule
  ],
  declarations: [
    AgreementsComponent,
    NewAgreementComponent,
    ListAgreementsComponent
  ],
  providers: [ ]
})
export class AgreementsModule { }
