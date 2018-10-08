import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { LandingNavigationService } from '../landing-navigation.service';
import { User } from './user.model';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private landingNavigationService: LandingNavigationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authenticationService.getCurrentUser()
        .pipe(
            flatMap((user: User) => {
              return this.landingNavigationService.navigateUser(user);
            })
        )
  }
}
