import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { select, Store } from '@ngrx/store';
import { CoreState, getAppContext, } from '../state-management/state/core.state.ts';
import { AppContext } from './app-context.enum';
import { distinctUntilChanged, flatMap, map } from 'rxjs/operators';
import { APP_BASE_HREF } from '@angular/common';
import { AppContextStrategy } from './app-context.strategy';
import { I18nService } from '../i18n.service';
import { isAuthenticatedUser, User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {

  private readonly appContext$: Observable<AppContext>;

  private appContextStrategies = [
    {
      matches: appContext => appContext === AppContext.EALV,
      isDesktopMenuShown: user => isAuthenticatedUser(user),
      appTitle: 'portal.context.ealv.app-title',
      logoUrl: 'portal.context.ealv.logo-filename',
      homeUrl: ['home']
    },
    {
      matches: appContext => appContext === AppContext.COMPETENCE_CATALOG,
      isDesktopMenuShown: user => true,
      appTitle: 'portal.context.competence-catalog.app-title',
      logoUrl: 'portal.context.competence-catalog.logo-filename',
      homeUrl: ['kk', 'home']
    }
  ];

  constructor(private store: Store<CoreState>,
              private i18nService: I18nService,
              @Inject(APP_BASE_HREF) private baseHref: string) {
    this.appContext$ = this.store.pipe(
      select(getAppContext)
    );
  }

  getAppContext(): Observable<AppContext> {
    return this.appContext$.pipe(distinctUntilChanged());
  }

  isDesktopMenuShown(user: User): Observable<boolean> {
    return this.getAppContext().pipe(
      map(appContext => this.findStrategy(appContext).isDesktopMenuShown(user))
    );
  }

  getHomeUrl(): Observable<string[]> {
    return this.getAppContext().pipe(
      map(appContext => this.findStrategy(appContext).homeUrl)
    );
  }

  getLogoUrl(): Observable<string> {
    return this.getAppContext().pipe(
      map(appContext => this.findStrategy(appContext).logoUrl),
      flatMap(filenameKey => this.i18nService.stream(filenameKey))
    );
  }

  getAppTitle(): Observable<string> {
    return this.getAppContext().pipe(
      map(appContext => this.findStrategy(appContext).appTitle)
    );
  }

  private findStrategy(appContext: AppContext): AppContextStrategy {
    return this.appContextStrategies.find(strategy => strategy.matches(appContext));
  }
}

export function isEalv(appContext: AppContext) {
  return appContext === AppContext.EALV;
}

export function isCompetenceCatalog(appContext: AppContext) {
  return appContext === AppContext.COMPETENCE_CATALOG;
}

