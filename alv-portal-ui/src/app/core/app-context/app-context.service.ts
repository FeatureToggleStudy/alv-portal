import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { select, Store } from '@ngrx/store';
import { CoreState, getAppContext, } from '../state-management/state/core.state.ts';
import { AppContext } from './app-context.enum';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {
  // TODO: Suggestion maybe we can use a strategy pattern

  private readonly appContext$: Observable<AppContext>;

  private readonly homeUrlMap = {
    [AppContext.EALV]: ['home'],
    [AppContext.COMPETENCE_CATALOG]: ['kk', 'home']
  };

  constructor(private store: Store<CoreState>,
              @Inject(APP_BASE_HREF) private baseHref: string) {

    this.appContext$ = this.store.pipe(
      select(getAppContext)
    );
  }

  getAppContext(): Observable<AppContext> {
    return this.appContext$.pipe(distinctUntilChanged());
  }

  getHomeUrl(): Observable<string[]> {
    return this.getAppContext().pipe(
      map(appContext => this.homeUrlMap[appContext])
    );
  }
}

export function isEalv(appContext: AppContext) {
  return appContext === AppContext.EALV;
}

export function isCompetenceCatalog(appContext: AppContext) {
  return appContext === AppContext.COMPETENCE_CATALOG;
}

export function isAnyContext() {
  return true;
}
