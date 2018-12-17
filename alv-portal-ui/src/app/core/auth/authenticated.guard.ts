import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { isAuthenticatedUser, User } from './user.model';
import { AbstractAuthenticationGuard } from './abstract-authentication.guard';
import { LandingNavigationService } from '../landing-navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard extends AbstractAuthenticationGuard {

  constructor(authenticationService: AuthenticationService, landingNavigationService: LandingNavigationService) {
    super(authenticationService, landingNavigationService);
  }

  protected canUserActivate(user: User): boolean {
    return isAuthenticatedUser(user);
  }

}
