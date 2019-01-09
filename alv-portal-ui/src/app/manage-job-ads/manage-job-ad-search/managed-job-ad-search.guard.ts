import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ManageJobAdsState } from '../state-management/state';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { InitResultListAction } from '../state-management/actions/manage-job-ads.actions';

@Injectable()
export class ManagedJobAdSearchGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private store: Store<ManageJobAdsState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticationService.getCurrentCompany().pipe(
      tap(() => this.store.dispatch(new InitResultListAction())),
      map(() => true)
    );
  }

}
