import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { JobAdFavouritesState } from '../state-management/state';
import { InitResultListAction } from '../state-management/actions';

@Injectable()
export class JobAdFavouritesGuard implements CanActivate {

  constructor(private store: Store<JobAdFavouritesState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(new InitResultListAction());
    return true;
  }

}
