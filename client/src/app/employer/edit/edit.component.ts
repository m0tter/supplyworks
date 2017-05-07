import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employer } from 'supplyworks';
import { Observable, Subscription } from 'rxjs';

import { EmployerService } from '../services';
import { EditService } from '../services';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  public editForm: FormGroup;
  private _employer: Employer;
  private _saving = false;
  private _error: string;
  private _sub = new Subscription();

  constructor(
    private formBuilder: FormBuilder, 
    private empService: EmployerService,
    private router: Router) {
      this._employer = {address: [{line1:'', line2:'', suburb:'', state:'', country:''}], casualId: [], contactId: '', employeeId: [], name: ''};
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
        // this.empService.save(this._employer)
        //   .then(res => this.router.navigate(['employer']))
        //   .catch(err => this._error = err);
      } else {
        this._error = 'Save error - employer ID is required to save';
      }
    }
  }

  doCancel(): void {
    this.router.navigate(['employer']);
  }

  ngOnInit() {
    this.buildForm();

    this._sub.add(
      this.empService.employer
        .map(res => this._employer = res)
        .catch(err => this.errorHandler(err))
        .do(() => { 
          this.editForm.setValue({
            name: this._employer.name,
            address: {
              line1: this._employer.address[0].line1,
              line2: this._employer.address[0].line2,
              suburb: this._employer.address[0].suburb
            }
          })
        })
        .subscribe()
    );
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  private errorHandler(error: any): Observable<any> {
    console.error('edit component is broken: ', error);
    this._error = error.message || error;
    return Observable.throw(error);
  }

}
