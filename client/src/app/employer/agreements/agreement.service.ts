import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthenticationService, DebugService } from '../services';
import { Agreement } from 'types';
import { API_EMPLOYER } from 'api-paths';

@Injectable()
export class AgreementService {
  
  constructor(
    private _authService: AuthenticationService,
    private _debugService: DebugService,
    private _http: Http
  ) { }

  public getAgreements(): Promise<Agreement[]> {
    return this._http.get(API_EMPLOYER.agreement, this._authService.authHeader())
      .toPromise()
      .then(res => {
        let json = res.json();
        if(json.success) {
          return <Agreement[]>json.data;
        }
        this.errorHandler(json.data)
      })
      .catch(err => this.errorHandler(err)) as Promise<Agreement[]>;
  }

  public getAgreement(id: string): Promise<Agreement> {
    return this.getAgreements()
      .then(res => res.find((element) => element._id === id));
  }

  public deleteAgreement(id:string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if(id) {
        this._http.delete(`${API_EMPLOYER.agreement}/${id}`, this._authService.authHeader())
        .toPromise()
        .then(res => {
          let json = res.json();
          if(json.success) resolve(true); else reject(json.data);
        })
        .catch(err => this.errorHandler(err))
      } else { reject('id missing'); }
    });
  }

  public updateAgreement(agreement:Agreement): Promise<Agreement> {
    return new Promise((resolve, reject) => {
      if(agreement) {
        this._http.put(`${API_EMPLOYER.agreement}/${agreement._id}`, agreement, this._authService.authHeader())
        .toPromise()
        .then(res => {
          let json = res.json();
          if(json.success) resolve(json.data); else reject(json.data);
        })
        .catch(err => this.errorHandler(err));
      } else { reject('no agreement supplied to update'); }
    });
  }

  public newAgreement(agreement:Agreement): Promise<Agreement> {
    return new Promise((resolve, reject) => {
      if(agreement) {
        this._http.post(API_EMPLOYER.agreement, agreement, this._authService.authHeader())
        .toPromise()
        .then(res => {
          let json = res.json();
          if(json.success) {
            resolve(json.data);
          } else {
            reject('An error occurred: ' + json.data);
          }
        })
        .catch(err => this.errorHandler(err))
      }
      else reject('Error - no agreement data received');
    });
  }

  private errorHandler(error: any): void {
    let e = 'An error occurred in AgreementService: ' + (error.message || error);
    console.log(e);
    throw new Error(error.message||error);
  }
}