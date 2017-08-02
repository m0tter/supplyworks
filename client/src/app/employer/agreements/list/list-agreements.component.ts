import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';

import { EmployerService } from '../../services';
import { AgreementService } from '../agreement.service';
import { UserService } from '../../services';
import { ErrorService, DebugService } from '../../services';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog.component';

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
    private _route: ActivatedRoute,
    private _dialog: MdDialog
  ) { }

  ngOnInit():void { 
    let id = this._employer.employerId;
    if(id) {
      this._service.getAgreements()
        .then(res => this._data = new TableDataSource<Agreement>(res))
        .catch(err => this.errorHandler(err));
    } else {
      this.errorHandler('An error has occurred, unable to obtain employer');
    }
  }

  delete(row:Agreement) {
    let dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.setMessage(
      'Are you sure you want to delete ' + row.name);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this._service.deleteAgreement(row._id)
      .then(res => {
        let a = this._data.data;
        a.splice(a.findIndex(e => e._id === row._id), 1);
        this._data.data = a;
      })
      .catch(err => this.errorHandler(err));
      }
    });
    
  }

  edit(row:Agreement) {
    this._router.navigate([`../${row._id}`], { relativeTo: this._route });
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