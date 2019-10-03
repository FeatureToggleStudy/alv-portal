import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from './core/auth/authentication.service';
import {
  filter,
  map,
  mergeMap,
  pairwise,
  startWith,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import {
  ActivatedRoute,
  GuardsCheckEnd,
  NavigationEnd,
  NavigationError,
  Router
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { I18nService } from './core/i18n.service';

import { CoreState } from './core/state-management/state/core.state.ts';
import { Store } from '@ngrx/store';
import { ToggleMainNavigationAction } from './core/state-management/actions/core.actions';
import { GATrackingService } from './shared/tracking/g-a-tracking.service';
import { ScrollService } from './core/scroll.service';
import { Observable } from 'rxjs';
import { ProfileInfoService } from './shared/layout/header/profile-info.service';
import { DOCUMENT } from '@angular/common';
import { FileDragDropService } from './shared/forms/input/file-input/file-drag-drop.service';
import { LandingNavigationService } from './core/landing-navigation.service';

const FALLBACK_TITLE_KEY = 'global.title';

const EMPTY_URL = 'EMPTY_URL';

@Component({
  selector: 'alv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  a11yMessage: string;

  constructor(private i18nService: I18nService,
              private titleService: Title,
              private router: Router,
              private landingNavigationService: LandingNavigationService,
              private store: Store<CoreState>,
              private trackingService: GATrackingService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private profileInfoService: ProfileInfoService,
              private scrollService: ScrollService,
              private fileDragDropService: FileDragDropService,
              @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {

    this.trackingService.init();

    this.i18nService.init();

    this.authenticationService.init();

    this.profileInfoService.init();

    this.handleGuardErrors();

    const activatedRoute$ = this.determineActivatedRoute();

    this.handleMainNavigationToggle(activatedRoute$);

    this.handleScrollToTop(activatedRoute$);

    this.handleTitle(activatedRoute$);

    this.fileDragDropService.disableFileDragDropGlobally();
  }

  private handleGuardErrors() {
    const lastUrl$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((value: NavigationEnd) => value.url),
      startWith(EMPTY_URL)
    );

    this.router.events.pipe(
      filter((event) => {
        if (event instanceof GuardsCheckEnd) {
          return !event.shouldActivate;
        } else if (event instanceof NavigationError) {
          return true;
        }
        return false;
      }),
      withLatestFrom(lastUrl$)
    ).subscribe(([navigationError, lastUrl]) => {
      if (lastUrl === EMPTY_URL) {
        this.landingNavigationService.navigateHome();
      }
    });
  }

  // Based on the idea: https://toddmotto.com/dynamic-page-titles-angular-2-router-events
  private determineActivatedRoute() {
    const activatedRoute$: Observable<ActivatedRoute> = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary')
    );
    return activatedRoute$;
  }


  private handleMainNavigationToggle(activatedRoute$: Observable<ActivatedRoute>) {
    activatedRoute$.pipe(
      mergeMap((route) => {
        return route.data.pipe(map(data => ({
          collapseNavigation: data.collapseNavigation,
          component: route.component
        })));
      }),
      startWith({
        collapseNavigation: undefined,
        component: undefined
      }),
      pairwise()
    ).subscribe(([prevValues, currentValues]) => {
      const prevComponent = prevValues.component;
      const currentComponent = currentValues.component;
      const currentCollapseState = currentValues.collapseNavigation;
      if (currentCollapseState !== undefined && prevComponent !== currentComponent) {
        this.store.dispatch(new ToggleMainNavigationAction({ expanded: !currentCollapseState }));
      }
    });
  }

  private handleScrollToTop(activatedRoute$: Observable<ActivatedRoute>) {
    activatedRoute$.pipe(
      mergeMap((route) => route.data),
      map((data) => data.scrollToTop)
    ).subscribe((scrollToTop) => {
      if (scrollToTop) {
        this.scrollService.scrollToTop();
      }
    });
  }

  private handleTitle(activatedRoute$: Observable<ActivatedRoute>) {
    activatedRoute$.pipe(
      mergeMap((route) => route.data),
      map((data) => data.titleKey),
      switchMap((titleKey) => {
        if (titleKey) {
          return this.i18nService.stream(titleKey);
        }
        return this.i18nService.stream(FALLBACK_TITLE_KEY);
      })
    ).subscribe((title) => {
      this.a11yMessage = title;
      this.titleService.setTitle(title);
      this.trackingService.trackCurrentPage(title);
    });
  }
}
