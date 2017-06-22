import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from '../../services';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
  private _subs = new Subscription();
  private _error:string;

  constructor(private _errorService:ErrorService) { }

  public clearError() {
    this._errorService.clear();
  }

  ngOnInit():void {
    this._subs.add(this._errorService.error.subscribe(err => this._error = err));
  }

  ngOnDestroy():void {
    this._subs.unsubscribe();
  }

}