import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LandingNavigationService } from "../../core/landing-navigation.service";
import { AuthenticationService } from "../../core/auth/authentication.service";
import { map, tap } from "rxjs/operators";

@Injectable()
export class LandingPageGuard implements CanActivate {

  constructor(private landingNavigationService: LandingNavigationService,
              private authenticationService: AuthenticationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authenticationService
      .getCurrentUser()
      .pipe(
        tap((user) => this.landingNavigationService.navigateUser(user)),
        map(() => false));
  }
}
