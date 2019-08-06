import { Injectable } from '@angular/core';
import uuid from 'uuid/v4';
import { CookieService } from 'ngx-cookie-service';
import { TrackingEvent } from './tracking.types';
import { I18nService } from '../../core/i18n.service';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { ProfileInfoService } from '../layout/header/profile-info.service';

const TRACKING_COOKIE_KEY = '__alv-portal.clientID';

@Injectable({
  providedIn: 'root'
})
export class KofTrackingService {
  trackingId: string;
  private readonly TRACKING_SERVICE_URL: string = '/trackingservice/api/tracking-item';

  constructor(private cookieService: CookieService,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService,
              private profileInfoService: ProfileInfoService,
              private http: HttpClient) {
    const existingTrackingId = this.cookieService.get(TRACKING_COOKIE_KEY);
    if (existingTrackingId) {
      this.trackingId = existingTrackingId;
    } else {
      const newTrackingId: string = uuid();
      this.cookieService.set(TRACKING_COOKIE_KEY, newTrackingId);
      this.trackingId = newTrackingId;
    }
  }

  /**
   * for now only works in staging and dev, not it prod
   * @param event
   */
  logEvent(event: TrackingEvent): Observable<Object> {
    return combineLatest(this.i18nService.currentLanguage$, this.profileInfoService.getProfileInfo()).pipe(
      switchMap(([currentLanguage, profileInfo]) => {
        return !profileInfo.inProduction ? this.submitRequest(event, currentLanguage, this.trackingId) : of({});
      }),
      catchError(x => {
        console.error(`Error during logging for the event for the event ${event}, trackingId: ${this.trackingId}`);
        return of({});
      })
    );
  }

  submitRequest(event: TrackingEvent, currentLanguage: string, trackingId: string): Observable<Object> {
    const body = {
      eventName: event.eventType,
      locale: currentLanguage,
      trackingId,
      eventData: event.data,
    };
    return this.http.post(this.TRACKING_SERVICE_URL, body);
  }
}
