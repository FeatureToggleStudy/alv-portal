import { Injectable } from '@angular/core';
import { AbstractAuthenticationGuard } from './abstract-authentication.guard';
import { AuthenticationService } from './authentication.service';
import { isNotAuthenticatedUser, User } from './user.model';
import { LandingNavigationService } from '../landing-navigation.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedGuard extends AbstractAuthenticationGuard {

  constructor(authenticationService: AuthenticationService, landingNavigationService: LandingNavigationService) {
    super(authenticationService, landingNavigationService);
  }

  protected canUserActivate(user: User, route: ActivatedRouteSnapshot): boolean {
    return isNotAuthenticatedUser(user);
  }

}
