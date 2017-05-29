import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services';

@Injectable()
export class AuthGuard {
  constructor( private _authService: AuthenticationService, private _router: Router ) { }

  public canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    let loggedIn = false;
    
    this._authService.isLoggedIn.subscribe(res => loggedIn = res)
    if(loggedIn) return true;
    this._router.navigate(['/employer/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  public canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
    return this._authService.isLoggedIn.take(1);
  }
}