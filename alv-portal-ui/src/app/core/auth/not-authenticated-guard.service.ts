import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AuthenticatedGuardService } from './authenticated-guard.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedGuardService implements CanActivate, CanActivateChild {

  constructor(private authenticatedGuardService: AuthenticatedGuardService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticatedGuardService.canActivate(route, state).pipe(map((r) => !r));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticatedGuardService.canActivateChild(childRoute, state).pipe(map((r) => !r));
  }
}
