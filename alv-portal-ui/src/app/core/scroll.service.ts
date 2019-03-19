import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(@Inject(DOCUMENT) private document: any,
              @Inject(WINDOW) private window: Window) {
  }

  /**
   * Only scrolls if supported
   * @param x
   * @param y
   */
  scrollBy(x: number, y: number) {
    if (this.window.scrollBy) {
      this.window.scrollBy(x, y);
    }
  }

  /**
   * Scroll to top, works in all browsers
   */
  scrollToTop() {
    if (this.window.scrollTo) {
      this.window.scrollTo(0, 0);
    } else {
      this.document.getElementById('scroll-top-hook').scrollIntoView();
    }
  }

  /**
   * Scroll element into view, works in all browsers
   * @param elementId
   * @return true if the element was found and scrolled into otherwise false
   */
  scrollIntoView(elementId: string): boolean {
    const element = this.document.getElementById(elementId);
    if (element) {
      element.scrollIntoView();
      return true;
    }
    return false;
  }
}
