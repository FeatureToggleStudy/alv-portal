import { AfterViewInit, Directive, ElementRef, NgZone } from '@angular/core';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Directive({
  selector: '.fa-layers, [svgFixing]'
})
export class SvgFixingDirective extends AbstractSubscriber implements AfterViewInit {

  constructor(private elementRef: ElementRef, private zone: NgZone, private router: Router, private location: Location) {
    super();
  }

  ngAfterViewInit() {
    this.router.events
      .pipe(
        filter(x => x instanceof NavigationEnd),
        startWith(() => {
          return new NavigationEnd(1, 'test', 'test');
        }),
        takeUntil(this.ngUnsubscribe)
      ).subscribe(() => this.applyFixes());
  }

  private applyFixes() {
    const baseUrl = this.location.path();
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        const element: Element = this.elementRef.nativeElement;
        if (element) {
          this.update(element, 'clip-path', baseUrl);
          this.update(element, 'mask', baseUrl);
        }
      }, 100);
    });
  }

  private update(element: Element, attr: string, baseUrl: string) {
    [].slice
      .call(element.querySelectorAll('*[' + attr + ']'))
      .filter((e: Element) => {
        return e.getAttribute(attr).indexOf('url(') !== -1;
      })
      .forEach((e: Element) => {
        const attrVal = e.getAttribute(attr);
        e.setAttribute(
          attr,
          `url(${baseUrl}${attrVal.slice(attrVal.indexOf('#'))}`
        );
      });
  }
}
