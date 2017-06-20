import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgreementsRoutingModule } from './agreements-routing.module';
import { AgreementsComponent } from './agreements.component';

@NgModule({
  imports: [
    AgreementsRoutingModule
  ],
  declarations: [
    AgreementsComponent
  ],
  providers: [ ]
})
export class AgreementsModule { }
