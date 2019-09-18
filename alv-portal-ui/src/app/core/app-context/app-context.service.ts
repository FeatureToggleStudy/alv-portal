import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { select, Store } from '@ngrx/store';
import { CoreState, getAppContext, } from '../state-management/state/core.state.ts';
import { AppContext } from './app-context.enum';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {

  private readonly appContext$: Observable<AppContext>;

  private homeUrlMap = {
    [AppContext.DEFAULT]: ['home'],
    [AppContext.COMPETENCE_CATALOG]: ['kk', 'home']
  };

  private eiamRedirectUrlMap = {
    [AppContext.DEFAULT]: 'landing',
    [AppContext.COMPETENCE_CATALOG]: 'kk/landing'
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

  getLatestAppContext(): Observable<AppContext> {
    return this.appContext$.pipe(take(1));
  }

  getHomeUrl(): Observable<string[]> {
    return this.getAppContext().pipe(
      map(appContext => this.homeUrlMap[appContext])
    );
  }

  getEiamRedirectUrl(): Observable<string> {
    return this.getLatestAppContext().pipe(
      map(appContext => this.baseHref + this.eiamRedirectUrlMap[appContext])
    );
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
