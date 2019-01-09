import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ManageJobAdsState } from '../state-management/state';
import { InitResultListAction } from '../state-management/actions/manage-job-ads.actions';

@Injectable()
export class ManagedJobAdSearchGuard implements CanActivate {

  constructor(private router: Router,
              private store: Store<ManageJobAdsState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(new InitResultListAction());
    return true;
  }

}
