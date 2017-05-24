import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable()
export class ErrorService {
  private _error: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public readonly error: Observable<string> = this._error.asObservable();

  public displayError(msg:string):void {
    this._error.next(msg);
  }

  public clear() {
    this._error.next('');
  }

  public errorHandler(error:any):void {
    console.error(JSON.stringify(error));
    this.displayError(error.message || error);
  }
}
