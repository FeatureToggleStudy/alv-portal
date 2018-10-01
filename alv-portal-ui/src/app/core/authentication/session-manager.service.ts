import { Injectable } from '@angular/core';

// The service manages the session tokens and other information that must be stored unlit the session is expered
@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  static readonly TOKEN_NAME = 'authenticationToken';

  /**
   * sets the date in milliseconds from the epoch of first showing the landing page
   * @param date
   */
  set landingPageFirstShown(date: string) {
    sessionStorage.setItem('visitedLandingPage', date)
  }

  /**
   * @return null if the landing page has not been shown during the current session or the date of the show
   */
  get landingPageFirstShown(): string | null {
    return sessionStorage.getItem('visitedLandingPage');
  }

  constructor() { }

  setToken(token: string): void {
    sessionStorage.setItem(SessionManagerService.TOKEN_NAME, token);
  }

  clearToken(): void {
    sessionStorage.removeItem(SessionManagerService.TOKEN_NAME);
  }

  getToken(): string {
    return sessionStorage.getItem(SessionManagerService.TOKEN_NAME);
  }



}
