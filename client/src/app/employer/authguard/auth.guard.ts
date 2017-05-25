import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services';

@Injectable()
export class AuthGuard {
  constructor( private _authService: AuthenticationService, private _router: Router ) { }

  public canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    throw new Error('not implemented');
  }

  public canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    return this._authService.isLoggedIn.take(1);
  }
}