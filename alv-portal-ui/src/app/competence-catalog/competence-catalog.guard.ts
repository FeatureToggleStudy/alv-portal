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
import { SetIsCompetenceCatalogAction } from '../core/state-management/actions/core.actions';
import { CompetenceCatalogHomeComponent } from './competence-catalog-home/competence-catalog-home.component';

@Injectable({
  providedIn: 'root'
})
export class CompetenceCatalogGuard implements CanActivate, CanDeactivate<CompetenceCatalogHomeComponent> {

  constructor(private store: Store<CoreState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.store.dispatch(new SetIsCompetenceCatalogAction({ isCompetenceCatalog: true }));
    return true;
  }

  canDeactivate(component: CompetenceCatalogHomeComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    this.store.dispatch(new SetIsCompetenceCatalogAction({ isCompetenceCatalog: false }));
    return true;
  }
}
