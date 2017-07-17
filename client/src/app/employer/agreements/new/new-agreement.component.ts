import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AgreementService, EmployerService } from '../../services';
import { UserService } from '../../services';
import { ErrorService, DebugService } from '../../services';
import { Agreement, AgreementTypes, User, TableDataSource } from 'types';

@Component({
  selector: 'app-new-agreement',
  templateUrl: './new-agreement.component.html',
  styleUrls: ['./new-agreement.component.scss']
})
export class NewAgreementComponent implements OnInit {
  private _agreement = new Agreement();
  private _typeNames:string[];
  private _selectedType = null;
  public newForm: FormGroup;
  private _users = new TableDataSource<User>();
  private _saving = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: AgreementService,
    private _user: UserService,
    private _debug: DebugService,
    private _error: ErrorService,
    private _employer: EmployerService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  buildForm():void {
    this.newForm = this._formBuilder.group({
      name: [this._agreement.name, Validators.required],
      type: this._agreement.agreementType,
      period: ''
    });
    const agreeType = this.newForm.get('type');
    agreeType.valueChanges.forEach((value: string) => { this._selectedType = value; });
  }

  doCancel():void {
    this._router.navigate(['employer/agreements']);
  }

  doSave():void {
    if(this.newForm.dirty && this.newForm.valid){
      this._saving = true;
      this._agreement.name    = this.newForm.value['name'];
      this._agreement.agreementType = this.newForm.value['type'];
      this._agreement.period  = this.newForm.value['period'];
      this._users.data.forEach(element => {
        if(element.selected) this._agreement.memberId.push(element._id);
      });
      this._agreement.employerId = this._employer.employerId;
      this.debug('doSave():_agreement = ' + JSON.stringify(this._agreement));
      this._service.newAgreement(this._agreement)
        .then(res => this._router.navigate(['../'], { relativeTo: this._route }))
        .catch(err => this.errorHandler);
    }
  }

  userSelect(row:User):void {
    row.selected = !row.selected;
  }

  ngOnInit():void {
    this._typeNames = Object.keys(AgreementTypes);
    this._typeNames = this._typeNames.slice(this._typeNames.length / 2);
    this._typeNames[0] = 'Choose...';

    this.buildForm();
    this._user.getUsers()
      .then(res => this._users.data = res)
      .catch(err => this.errorHandler(err));
  }

  errorHandler(msg: string): void {
    this._error.errorHandler(msg);
  }

  debug(msg:string):void {
    this._debug.log('new-agreement.component:' + msg);
  }
}