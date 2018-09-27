import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Credentials, User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';
import { SessionManagerService } from './session-manager.service';
import { MessageBusService } from '../message-bus.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient,
              private sessionManagerService: SessionManagerService) {
  }

  /**
   * Refreshes the getCurrentUser, will return 401 if unauthorized
   */
  getCurrentUser(): Observable<User> {

    if (this.currentUser.getValue() === null) {
      return this.httpClient.get<User>('/api/current-user', { observe: 'response' }).pipe(
          flatMap(response => {
            this.sessionManagerService.setToken(response.headers.get('Authorization'));
            this.currentUser.next(response.body);
            return this.currentUser;
          })
      );
    }
    return this.currentUser;
  }

  /**
   * Login without eIAM, only needed for local development
   * @param credentials
   */
  login(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>('/api/authenticate', credentials, { observe: 'response' }).pipe(
        flatMap(response => {
          this.sessionManagerService.setToken(response.headers.get('Authorization'));
          return this.getCurrentUser();
        })
    );
  }

  /**
   * Logout and clear all getCurrentUser data
   */
  logout(): void {
    this.sessionManagerService.clearToken();
    this.currentUser.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser.getValue();
  }

}
