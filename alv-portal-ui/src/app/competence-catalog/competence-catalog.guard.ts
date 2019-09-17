import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoreState } from '../core/state-management/state/core.state.ts';
import { SetAppContextAction } from '../core/state-management/actions/core.actions';
import { CompetenceCatalogHomeComponent } from './competence-catalog-home/competence-catalog-home.component';
import { AppContext } from '../core/app-context/app-context.enum';

@Injectable({
  providedIn: 'root'
})
export class CompetenceCatalogGuard implements CanActivate, CanDeactivate<CompetenceCatalogHomeComponent> {

  constructor(private store: Store<CoreState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.store.dispatch(new SetAppContextAction({ appContext: AppContext.COMPETENCE_CATALOG }));
    return true;
  }

  canDeactivate(component: CompetenceCatalogHomeComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    this.store.dispatch(new SetAppContextAction({ appContext: AppContext.DEFAULT }));
    return true;
  }
}
