import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employer } from 'supplyworks';

import { EmployerService } from '../services';
import { EditService } from '../services';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public editForm: FormGroup;
  private _employer: Employer
  private _saving = false;
  private _error: string;

  constructor(
    private formBuilder: FormBuilder, 
    private empService: EmployerService,
    private router: Router) { 
  }

  buildForm(): void {
    this.editForm = this.formBuilder.group({
      name: [this._employer.name, Validators.required],
      address: this.formBuilder.group({
       line1: this._employer.address[0].line1,
       line2: this._employer.address[0].line2,
       suburb: this._employer.address[0].suburb
      })
    });
  }

  doEdit(): void { 
    this._saving = true;
    if(this.editForm.dirty && this.editForm.valid) {
      let id = this._employer._id;
      this._employer = this.editForm.value;
      this._employer._id = id;
      if(this._employer._id) {
        this.empService.save(this._employer)
          .then(res => this.router.navigate(['employer']))
          .catch(err => this._error = err);
      } else {
        this._error = 'Save error - employer ID is required to save';
      }
    }
  }

  doCancel(): void {
    this.router.navigate(['employer']);
  }

  ngOnInit() {
    this._employer = this.empService.employer;
    this.buildForm();
  }

}
