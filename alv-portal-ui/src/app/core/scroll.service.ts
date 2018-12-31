import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(@Inject(DOCUMENT) private document: any) {
  }

  /**
   * Only scrolls if supported
   * @param x
   * @param y
   */
  scrollBy(x: number, y: number) {
    const mainElement = this.getMainElement();
    if (mainElement.scrollBy) {
      mainElement.scrollBy(x, y);
    }
  }

  /**
   * Scroll to top, works in all browsers
   */
  scrollToTop() {
    const mainElement = this.getMainElement();
    if (mainElement.scrollTo) {
      mainElement.scrollTo(0, 0);
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

  startListenOnScroll(listener: (event) => void) {
    this.getMainElement().addEventListener('scroll', listener);
  }

  stopListenOnScroll(listener: (event) => void) {
    this.getMainElement().removeAllListeners('scroll', listener);
  }

  private getMainElement() {
    return this.document.querySelector('main');
  }
}
