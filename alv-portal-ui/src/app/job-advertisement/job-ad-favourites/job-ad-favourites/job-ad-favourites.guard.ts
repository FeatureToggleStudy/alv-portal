import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { map } from 'rxjs/operators';
import { isAuthenticatedUser } from '../../../core/auth/user.model';
import { Observable } from 'rxjs';


@Injectable()
export class JobAdFavouritesGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticationService.getCurrentUser().pipe(
      map(user => isAuthenticatedUser(user))
    );
  }

}
