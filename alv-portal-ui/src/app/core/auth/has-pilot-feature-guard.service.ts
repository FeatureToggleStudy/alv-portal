import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { hasAnyAuthorities, hasPilotFeature, User } from './user.model';
import { AbstractAuthenticationGuard } from './abstract-authentication.guard';
import { AuthenticationService } from './authentication.service';
import { LandingNavigationService } from '../landing-navigation.service';

@Injectable({
  providedIn: 'root'
})
export class HasPilotFeatureGuard extends AbstractAuthenticationGuard {

  constructor(authenticationService: AuthenticationService, landingNavigationService: LandingNavigationService) {
    super(authenticationService, landingNavigationService);
  }

  protected canUserActivate(user: User, route: ActivatedRouteSnapshot): boolean {
    return hasPilotFeature(user, route.data.featureCode);
  }

}
