import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot
} from '@angular/router';
import { CoreState } from './state-management/state/core.state.ts';
import { Store } from '@ngrx/store';
import { LazyLoadedModuleDestroyedAction } from './state-management/actions/core.actions';

@Injectable({
  providedIn: 'root'
})
export class LazyModuleDeactivateGuard implements CanDeactivate<any> {

  constructor(private store: Store<CoreState>) {
  }

  canDeactivate(component: any, route: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    const moduleName = route.data.moduleName;
    if (moduleName) {
      this.store.dispatch(new LazyLoadedModuleDestroyedAction({moduleName: moduleName}));
    }
    return true;
  }

}
