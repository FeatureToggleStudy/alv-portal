import { AfterViewInit, Directive, ElementRef, NgZone } from '@angular/core';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

function isSafariBrowser() {
  return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('CriOS') === -1 &&
    navigator.userAgent.indexOf('FxiOS') === -1;
}

@Directive({
  /* tslint:disable:directive-selector */
  selector: '.fa-layers, [svgFixing]'
})
export class SvgFixingDirective extends AbstractSubscriber implements AfterViewInit {

  constructor(private elementRef: ElementRef, private zone: NgZone, private router: Router, private location: Location) {
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
    const baseUrl = this.location.path();
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        setTimeout(() => {
          const element: Element = this.elementRef.nativeElement;
          if (element) {
            this.prefixWithBaseUrl(element, 'clip-path', baseUrl);
            this.prefixWithBaseUrl(element, 'mask', baseUrl);
            this.prefixWithBaseUrl(element, 'fill', baseUrl);
          }
        }, 100);
      }, 0);
    });
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
