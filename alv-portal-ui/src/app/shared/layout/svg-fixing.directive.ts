import { AfterViewInit, Directive, ElementRef, NgZone } from '@angular/core';

@Directive({
  selector: '.fa-layers'
})
export class SvgFixingDirective implements AfterViewInit {


  constructor(private elementRef: ElementRef, private zone: NgZone) {
  }

  ngAfterViewInit() {
    const baseUrl = window.location.pathname
      .replace(window.location.hash, '')
      .replace(/\/$/gi, '');
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        setTimeout(() => {
          const element: Element = this.elementRef.nativeElement;
          if (element) {
            this.update(element, 'clip-path', baseUrl);
            this.update(element, 'mask', baseUrl);
          }
        }, 1000);
      }, 1000);
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
