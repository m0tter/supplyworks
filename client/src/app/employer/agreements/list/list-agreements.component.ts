import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AgreementService, EmployerService } from '../../services';
import { UserService } from '../../services';
import { ErrorService, DebugService } from '../../services';
import { Agreement, AgreementTypes, TableDataSource } from 'types';

@Component({
  selector: 'app-list-agreements',
  templateUrl: './list-agreements.component.html',
  styleUrls: ['./list-agreements.component.scss']
})
export class ListAgreementsComponent implements OnInit {
  private _agreements: Agreement[];
  private _data: TableDataSource<Agreement>;

  constructor(
    private _service: AgreementService,
    private _employer: EmployerService,
    private _error: ErrorService,
    private _debug: DebugService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit():void { 
    let id = this._employer.employerId;
    if(id) {
      this._service.getAgreements(id)
        .then(res => this._data = new TableDataSource<Agreement>(res))
        .catch(err => this.errorHandler(err));
    } else {
      this.errorHandler('An error has occurred, unable to obtain employer');
    }
  }

  delete(row:Agreement) {
    let a = this._data.data;
    a.splice(a.findIndex(e => e._id === row._id), 1);
    this._data.data = a;
  }

  goHome():void {
    this._router.navigate(['/employer']);
  }

  newAgreement():void {
    this._router.navigate(['../new'], { relativeTo: this._route });
  }

  errorHandler(msg: string): void {
    this._error.errorHandler(msg);
  }

  debug(msg:string):void {
    this._debug.log('list-agreement.component:' + msg);
  }
}