import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';

declare var gtag: Function;

export const GLOBAL_PARAMS = {
  anonymize_ip: true
};

export function initScript(gaTrackingId: string) {
  const head = document.getElementsByTagName('head')[0];

  const gtagScriptElement = document.createElement('script');
  gtagScriptElement.async = false;
  gtagScriptElement.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaTrackingId;

  const gtagInlineScriptElement = document.createElement('script');
  gtagInlineScriptElement.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${gaTrackingId}', ${JSON.stringify(GLOBAL_PARAMS)})
  `;
  head.insertBefore(gtagInlineScriptElement, head.firstChild);
  head.insertBefore(gtagScriptElement, head.firstChild);
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export interface TrackingEventParams {
  event_category?: string;
  event_label?: string;
  value?: any;
}

interface EventTrack {
  name: string;
  params: TrackingEventParams;
}

interface PageTrack {
  page_path: string;
  page_location: string;
  page_title?: string;
}

interface ExceptionTrack {
  description: string;
  fatal: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private readonly gaTrackingId: string;

  private eventTrack = new ReplaySubject<Partial<EventTrack>>(10);

  private pageTrack = new ReplaySubject<Partial<PageTrack>>(10);

  private exceptionTrack = new ReplaySubject<Partial<ExceptionTrack>>(10);

  constructor(private router: Router) {
    this.gaTrackingId = environment.gaTrackingId;
  }

  public init() {
    if (!this.gaTrackingId) {
      return;
    }

    initScript(this.gaTrackingId);

    this.eventTrack.pipe(
      skipWhile(() => !gtag)
    ).subscribe(data => {
      gtag('event', data.name, data.params);
    });

    this.pageTrack.pipe(
      skipWhile(() => !gtag),
      map(pageTrack => ({ ...pageTrack, ...GLOBAL_PARAMS })))
      .subscribe(data => {
        gtag('config', environment.gaTrackingId, data);
      });

    this.exceptionTrack.pipe(
      skipWhile(() => !gtag))
      .subscribe(data => {
        gtag('event', 'exception', data);
      });
  }

  public trackCurrentPage(title?: string) {
    const pageTrack: PageTrack = {
      page_path: this.router.url,
      page_location: window.location.href,
      page_title: title,
    };
    this.pageTrack.next(pageTrack);
  }

  public trackEvent(name: string, params: TrackingEventParams = {}) {
    const eventTrack = {
      name: name,
      params: params
    };
    this.eventTrack.next(eventTrack);
  }

  public trackExceptionMessage(errorMessage: string, fatal = false) {
    const exceptionTrack = {
      description: errorMessage,
      fatal: fatal
    };
    this.exceptionTrack.next(exceptionTrack);
  }

  public trackException(err: Error, fatal = false) {
    this.trackExceptionMessage(err.message, fatal);
  }

}
