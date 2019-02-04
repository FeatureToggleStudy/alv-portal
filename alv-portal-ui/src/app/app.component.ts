import { Component, NgZone, OnInit } from '@angular/core';
import { AuthenticationService } from './core/auth/authentication.service';
import { filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { I18nService } from './core/i18n.service';
import { AbstractSubscriber } from './core/abstract-subscriber';

const FALLBACK_TITLE_KEY = 'global.title';

@Component({
  selector: 'alv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AbstractSubscriber implements OnInit {

  a11yMessage: string;

  constructor(private i18nService: I18nService,
              private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private zone: NgZone) {
    super();
  }

  ngOnInit() {

    this.i18nService.init();

    this.authenticationService.init();

    // Based on the idea: https://toddmotto.com/dynamic-page-titles-angular-2-router-events
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
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
    });


    this.router.events
      .pipe(
        filter(x => x instanceof NavigationEnd),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            setTimeout(() => {
              this.changeSvgPaths();
            }, 50);
          }, 0);
        });
      });
  }

  private changeSvgPaths() {
    /**
     * Current URL, without the hash
     */
    const baseUrl = window.location.pathname
      .replace(window.location.hash, '')
      .replace(/\/$/gi, '');

    [].slice
      .call(document.querySelectorAll('*[mask]'))
      /**
       * Filter out all elements whose namespaced `mask` attributes doesn't
       * which doesnt have cross referenced values
       *
       * Note: we're assuming the `url(` prefix for the cross referenced mask !
       */
      .filter((element: Element) => element.getAttribute('mask').indexOf('url(') !== -1)

      /**
       * Insert `window.location` to the `mask` attribute value,
       * in order to make it an absolute IRI
       *
       */
      .forEach((element: Element) => {
        const attrVal = element.getAttribute('mask');
        element.setAttribute(
          'mask',
          `url(${baseUrl}${attrVal.slice(attrVal.indexOf('#'))}`
        );
      });
  }

}
