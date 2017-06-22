import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'employer-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  private _message = '';
  
  constructor(
    private _dialogRef: MdDialogRef<ConfirmDialogComponent>
  ) { }
  
  public setMessage(msg:string):void {
    this._message = msg;
  }

  btnOK_Click():void {
    this._dialogRef.close(true);
  }

  btnCancel_Click():void {
    this._dialogRef.close(false);
  }

  ngOnInit() { }
}
