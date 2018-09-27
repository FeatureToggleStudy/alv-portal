import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Credentials, User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { catchError, flatMap, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { SessionManagerService } from './session-manager.service';
import { MessageBusService, MessageType } from '../message-bus.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser: User;

  constructor(private httpClient: HttpClient,
              private sessionManagerService: SessionManagerService,
              private messageBusService: MessageBusService) {
  }

  /**
   * Refreshes the session, will return 401 if unauthorized
   */
  session(): Observable<User> {
    return this.httpClient.get<User>('/api/current-user', { observe: 'response' }).pipe(
        map(response => {
          this.sessionManagerService.setToken(response.headers.get('Authorization'));
          this.currentUser = response.body;
          this.messageBusService.emit<User>(MessageType.CURRENT_USER, this.currentUser);
          return response.body;
        })
    );
  }

  /**
   * Login without eIAM, only needed for local development
   * @param credentials
   */
  login(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>('/api/authenticate', credentials, { observe: 'response' }).pipe(
        catchError(error => {
          console.log(error);
          // TODO: show error notification
          return of(null);
        }),
        flatMap(response => {
          this.sessionManagerService.setToken(response.headers.get('Authorization'));
          return this.session();
        })
    );
  }

  /**
   * Logout and clear all session data
   */
  logout(): Observable<null> {
    // TODO: Get logout URL from backend config
    this.sessionManagerService.clearToken();
    this.currentUser = null;
    this.messageBusService.emit<User>(MessageType.CURRENT_USER, null);
    return of(null);
  }

  isAuthenticated(): boolean {
    return !!this.sessionManagerService.getToken();
  }

  getCurrentUser(): User {
    return this.currentUser;
  }
}
