import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreState } from '../state-management/state/core.state.ts';
import { SetAppContextAction } from '../state-management/actions/core.actions';

@Injectable({
  providedIn: 'root'
})
export class AppContextGuard implements CanActivate {

  constructor(private store: Store<CoreState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const appContext = route.data.appContext;
    if (appContext) {
      this.store.dispatch(new SetAppContextAction({ appContext: appContext }));
    }
    return true;
  }

}
