import { Inject, Injectable } from '@angular/core';
import {
  Notification,
  NotificationType
} from '../shared/layout/notifications/notification.model';
import { DOCUMENT } from '@angular/common';
import { composeResultListItemId } from '../job-ad-search/job-search/result-list-item/result-list-item.component';

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
   */
  scrollIntoView(elementId: string) {
    const element = this.document.getElementById(elementId);
    if (element) {
      element.scrollIntoView();
    }
  }

  private getMainElement() {
    return this.document.querySelector('main');
  }
}
