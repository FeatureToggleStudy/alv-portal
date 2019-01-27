import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../core/auth/authentication.service';
import { hasAnyAuthorities, UserRole } from '../core/auth/user.model';
import { JOB_ADVERTISEMENT_QUERY_PARAM_NAME } from './job-publication-query-params';

@Injectable()
export class JobPublicationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const duplicationJobAdvertisementId = route.queryParams[JOB_ADVERTISEMENT_QUERY_PARAM_NAME];

    if (duplicationJobAdvertisementId) {
      return this.authenticationService.getCurrentUser().pipe(
        map((user) => hasAnyAuthorities(user, [UserRole.ROLE_PAV, UserRole.ROLE_COMPANY]))
      );
    }

    return true;
  }

}
