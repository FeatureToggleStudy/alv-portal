import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { select, Store } from '@ngrx/store';
import { CoreState, getAppContext, } from '../state-management/state/core.state.ts';
import { AppContext } from './app-context.enum';
import { distinctUntilChanged, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {

  private readonly appContext$: Observable<AppContext>;

  constructor(private store: Store<CoreState>) {

    this.appContext$ = this.store.pipe(
      select(getAppContext)
    );
  }

  getAppContext(): Observable<AppContext> {
    return this.appContext$.pipe(distinctUntilChanged());
  }

  getLatestAppContext(): Observable<AppContext> {
    return this.appContext$.pipe(take(1));
  }
}

export function isDefault(appContext: AppContext) {
  return appContext === AppContext.DEFAULT;
}

export function isCompetenceCatalog(appContext: AppContext) {
  return appContext === AppContext.COMPETENCE_CATALOG;
}

export function isAnyContext() {
  return true;
}
