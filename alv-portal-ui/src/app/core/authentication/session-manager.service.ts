import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  static readonly TOKEN_NAME = 'authenticationToken';

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(SessionManagerService.TOKEN_NAME, token);
  }

  clearToken(): void {
    localStorage.removeItem(SessionManagerService.TOKEN_NAME);
  }

  getToken(): string {
    return localStorage.getItem(SessionManagerService.TOKEN_NAME);
  }

}
