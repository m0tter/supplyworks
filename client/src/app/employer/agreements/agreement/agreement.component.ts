import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AgreementService } from '../agreement.service';
import { ErrorService, DebugService, UserService, EmployerService } from '../../services';
import { Agreement, AgreementTypes, TableDataSource, User } from 'types';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {
  private _form: FormGroup;
  private _agreement = new Agreement();
  private _selectedType = null;
  private _typeNames: string[];
  private _users = new TableDataSource<User>();
  private _saving = false;
  private _newAgreement = false;
  
  constructor(
    private __formBuilder: FormBuilder,
    private __service: AgreementService,
    private __route: ActivatedRoute,
    private __users: UserService,
    private __router: Router,
    private __employer: EmployerService
  ) { }

  buildForm():void {
    this._form = this.__formBuilder.group({
      name: [ this._agreement.name, Validators.required ],
      type: this._agreement.agreementType,
      period: this._agreement.period,
      lessons: this._agreement.lessons,
      countBreaks: this._agreement.countBreaks,
      allowOverride: this._agreement.allowOverride
    });
    const agreeType = this._form.get('type');
    agreeType.valueChanges.forEach((value: string) => { this._selectedType = value; });
  }

  ngOnInit(): void {
    this.__route.params
      .switchMap(params => {
        if(params['id']){
          return this.__service.getAgreement(params['id']);
        } else {
          this._newAgreement = true;
          return Promise.resolve(new Agreement());
        }
      })
      .subscribe(
        res => {
          this._agreement = res;
          this._selectedType = res.agreementType;
          this.buildForm();
        },
        err => this.errorHandler(err)
      );
    this.buildForm();

    this.__users.getUsers()
      .then(
        res => { this._users.data = res; this.matchUsers(); }, 
        err => this.errorHandler(err)
      );

    this._typeNames = Object.keys(AgreementTypes);
    this._typeNames = this._typeNames.slice(this._typeNames.length / 2);
    this._typeNames[0] = 'Choose...';
  }

  matchUsers():void {
    if(this._users.data) {
      this._agreement.memberId.forEach(e => {
        this._users.data
          .find(u => u._id === e)
            .selected = true;
      })
    }
  }

  doSave():void {
    this._agreement.memberId = new Array();
    if(this._form.dirty && this._form.valid){
      this._saving = true;
      this._agreement.name          = this._form.value['name'];
      this._agreement.agreementType = this._form.value['type'];
      this._agreement.period        = this._form.value['period'];
      this._agreement.lessons       = this._form.value['lessons'];
      this._agreement.countBreaks   = this._form.value['countBreaks'];
      this._agreement.allowOverride = this._form.value['allowOverride'];
      this._users.data.forEach(element => {
        if(element.selected) this._agreement.memberId.push(element._id);
      });
      this._agreement.employerId = this.__employer.employerId;

      if(this._newAgreement) {
        this.__service.newAgreement(this._agreement)
          .then(res => this.__router.navigate(['../'], { relativeTo: this.__route }))
          .catch(err => this.errorHandler(err));
      } else {
        this.__service.updateAgreement(this._agreement)
          .then(res => this.__router.navigate(['../'], { relativeTo: this.__route }))
          .catch(err => this.errorHandler(err));
      }
    }
  }

  doCancel():void {
    this.__router.navigate(['../'], { relativeTo: this.__route });
  }

  userSelect(row:User):void {
    row.selected = !row.selected;
    this._form.markAsDirty();
  }

  errorHandler(msg: string){

  }
}