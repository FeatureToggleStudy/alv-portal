import { AfterViewInit, Directive, ElementRef, Inject } from '@angular/core';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { APP_BASE_HREF, Location } from '@angular/common';

function isSafariBrowser() {
  return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    // navigator.userAgent.indexOf('CriOS') === -1 &&
    navigator.userAgent.indexOf('FxiOS') === -1;
}

@Directive({
  /* tslint:disable:directive-selector */
  selector: 'fa-icon'
})
export class SvgFixingDirective extends AbstractSubscriber implements AfterViewInit {

  constructor(@Inject(APP_BASE_HREF) private baseHref: string, private elementRef: ElementRef, private router: Router, private location: Location) {
    super();
  }

  ngAfterViewInit() {
    if (!isSafariBrowser()) {
      return;
    }
    this.router.events
      .pipe(
        filter(x => x instanceof NavigationEnd),
        startWith(() => {
          return new NavigationEnd(1, '', '');
        }),
        takeUntil(this.ngUnsubscribe)
      ).subscribe(() => this.applySvgFixes());
  }

  private applySvgFixes() {
    const baseUrl = this.extractBaseUrl();
    const element: Element = this.elementRef.nativeElement;
    if (element) {
      this.prefixWithBaseUrl(element, 'clip-path', baseUrl);
      this.prefixWithBaseUrl(element, 'mask', baseUrl);
      this.prefixWithBaseUrl(element, 'fill', baseUrl);
    }
  }

  private extractBaseUrl() {
    let baseUrl = this.baseHref + this.location.path();
    baseUrl = baseUrl.replace(/\/\//g, '/');
    return baseUrl;
  }

  private prefixWithBaseUrl(element: Element, attribute: string, baseUrl: string) {
    [].slice
      .call(element.querySelectorAll('*[' + attribute + ']'))
      .filter((e: Element) => {
        return e.getAttribute(attribute).indexOf('url(') !== -1;
      })
      .forEach((e: Element) => {
        const attrVal = e.getAttribute(attribute);
        e.setAttribute(
          attribute,
          `url(${baseUrl}${attrVal.slice(attrVal.indexOf('#'))}`
        );
      });
  }
}
