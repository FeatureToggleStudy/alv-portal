import { Component, NgZone, OnInit } from '@angular/core';
import { AuthenticationService } from './core/auth/authentication.service';
import { filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { I18nService } from './core/i18n.service';
import { AbstractSubscriber } from './core/abstract-subscriber';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);


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
              //this.changeSvgPaths();
            }, 100);
          }, 50);
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
      .call(document.querySelectorAll('use[*|href]'))

      /**
       * Filter out all elements whose namespaced `href` attribute doesn't
       * start with `#` (i.e. all non-relative IRI's)
       *
       * Note: we're assuming the `xlink` prefix for the XLink namespace!
       */
      .filter(function (element) {
        return (
          element
            .getAttributeNS('http://www.w3.org/1999/xlink', 'href')
            .indexOf('#') !== -1
        );
      })

      /**
       * Prepend `window.location` to the namespaced `href` attribute value,
       * in order to make it an absolute IRI
       *
       * Note: we're assuming the `xlink` prefix for the XLink namespace!
       */
      .forEach(function (element: HTMLElement) {
        const oldHref = element.getAttributeNS(
          'http://www.w3.org/1999/xlink',
          'href'
        ) as string;
        const idPart = oldHref.slice(oldHref.indexOf('#'));
        element.setAttributeNS(
          'http://www.w3.org/1999/xlink',
          'xlink:href',
          baseUrl + idPart
        );
      });

    [].slice
      .call(document.querySelectorAll('svg'))
      .filter(function (element: SVGElement) {
        return (
          'mask' in element.style && element.style.mask.indexOf('url(') !== -1
        );
      })
      .forEach(function (element: SVGElement) {
        const attrVal = element.style.mask;
        element.style.mask = `url(${baseUrl}${attrVal.slice(
          attrVal.indexOf('#')
        )}`;
      });

    [].slice
      .call(document.querySelectorAll('*[mask]'))
      .filter((element: Element) => element.getAttribute('mask').indexOf('url(') !== -1)
      .forEach((element: Element) => {
        const attrVal = element.getAttribute('mask');
        element.setAttribute(
          'mask',
          `url(${baseUrl}${attrVal.slice(attrVal.indexOf('#'))}`
        );
      });

    [].slice
      .call(document.querySelectorAll('*[clip-path]'))
      .filter(function (element: Element) {
        return element.getAttribute('clip-path').indexOf('url(') !== -1;
      })
      .forEach(function (element: Element) {
        const attrVal = element.getAttribute('clip-path');
        element.setAttribute(
          'clip-path',
          `url(${baseUrl}${attrVal.slice(attrVal.indexOf('#'))}`
        );
      });
  }

}
