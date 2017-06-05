import { Injectable } from '@angular/core';

@Injectable()
export class DebugService {
  private _debugEnabled = false;

  public set DebugEnabled(value: boolean) { this._debugEnabled = value; }
  
  public log(msg:string):void {
    if(this._debugEnabled)
      console.log(msg);
  }

  public warn(msg:string):void {
    if(this._debugEnabled)
      console.warn(msg);
  }

  // TODO: log to server if connection is possible 
}