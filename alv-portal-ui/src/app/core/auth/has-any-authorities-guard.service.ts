import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { hasAnyAuthorities, User } from './user.model';
import { AbstractAuthenticationGuard } from './abstract-authentication.guard';
import { AuthenticationService } from './authentication.service';
import { LandingNavigationService } from '../landing-navigation.service';

@Injectable({
  providedIn: 'root'
})
export class HasAnyAuthoritiesGuard extends AbstractAuthenticationGuard {

  constructor(authenticationService: AuthenticationService, landingNavigationService: LandingNavigationService) {
    super(authenticationService, landingNavigationService);
  }

  protected canUserActivate(user: User, route: ActivatedRouteSnapshot): boolean {
    const authorities = route.data.authorities || [];
    return hasAnyAuthorities(user, authorities);
  }

}
