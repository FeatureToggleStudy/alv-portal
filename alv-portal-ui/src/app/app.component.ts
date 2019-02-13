import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/auth/authentication.service';
import { filter, map, mergeMap, pairwise, startWith, switchMap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { I18nService } from './core/i18n.service';

import { CoreState } from './core/state-management/state/core.state.ts';
import { Store } from '@ngrx/store';
import { ToggleMainNavigationAction } from './core/state-management/actions/core.actions';
import { TrackingService } from './shared/tracking/tracking.service';

const FALLBACK_TITLE_KEY = 'global.title';

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
              private store: Store<CoreState>,
              private trackingService: TrackingService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {

    this.trackingService.init();

    this.i18nService.init();

    this.authenticationService.init();

    // Based on the idea: https://toddmotto.com/dynamic-page-titles-angular-2-router-events
    const currentRoute$ = this.router.events.pipe(
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

    currentRoute$.pipe(
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

    currentRoute$.pipe(
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
      this.trackingService.trackPage(title);
    });
  }
}
