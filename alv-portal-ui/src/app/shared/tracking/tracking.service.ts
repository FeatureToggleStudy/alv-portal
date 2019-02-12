import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

declare var gtag: Function;

export function initScript(gaTrackingId: string) {
  const head = document.getElementsByTagName('head')[0];

  const googleAnalyticsFirstScript = document.createElement('script');
  googleAnalyticsFirstScript.async = false;
  googleAnalyticsFirstScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaTrackingId;

  const googleAnalyticsSecondScript = document.createElement('script');
  googleAnalyticsSecondScript.innerHTML = 'window.dataLayer = window.dataLayer || [];\n' +
    ' function gtag(){dataLayer.push(arguments);}\n' +
    ' gtag(\'js\', new Date());\n' +
    '';
  head.insertBefore(googleAnalyticsSecondScript, head.firstChild);
  head.insertBefore(googleAnalyticsFirstScript, head.firstChild);
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: any;

  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private readonly gaTrackingId: string;

  private readonly trackingEnabled;

  constructor(private router: Router) {
    this.gaTrackingId = environment.gaTrackingId;
    this.trackingEnabled = !!this.gaTrackingId;
  }

  public init() {
    initScript(this.gaTrackingId);
  }

  public trackPage(title: string) {
    if (!this.trackingEnabled && !gtag) {
      return;
    }
    const params = {
      page_path: this.router.url,
      page_location: window.location.href,
      page_title: title
    };
    gtag('config', environment.gaTrackingId, params);
  }

  public trackEvent(name: string, params: GtagEventParams = {}) {
    if (!this.trackingEnabled && !gtag) {
      return;
    }
    gtag('event', name, params);
  }

}
