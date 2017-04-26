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
      this._employer = this.editForm.value;
      this.empService.save()
        .then(res => this.router.navigate(['employer']))
        .catch(err => this._error = err)
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

/*
this.registering = true;
    if(this.registerForm.dirty && this.registerForm.valid) {
      const formModel = this.registerForm.value;
      this.employer.name = formModel.name;
      this.adminUser = formModel.user;
      this.employer.address.push(formModel.address);

      this.registerService.Register(this.employer, this.adminUser)
        .then(res => { this.result = JSON.stringify(res); this.registering = false; })
        .catch( err => { this.result = err; this.registering = false; });
        
*/

