import { Injectable } from '@angular/core';

// The service manages the session tokens and other information that must be stored unlit the session is expired
@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  static readonly TOKEN_NAME = 'authenticationToken';

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
