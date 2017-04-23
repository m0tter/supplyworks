import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employer } from 'supplyworks';

import { EditService } from '../services';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public editForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { this.buildForm(); }

  buildForm(): void {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: this.formBuilder.group({
       line1: '',
       line2: '',
       suburb: ''
      })
    });
  }

  doEdit(): void { }

  ngOnInit() {
  }

}
