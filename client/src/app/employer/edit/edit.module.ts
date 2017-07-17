import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { ErrorModule } from '../shared'

@NgModule({
  imports: [
    ErrorModule,
    CommonModule,
    EditRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    EditComponent
  ],
  providers: [ ]
})
export class EditModule { }