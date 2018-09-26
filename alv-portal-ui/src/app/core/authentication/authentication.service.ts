import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Credentials, User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
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

  session(): Observable<User> {
    return this.httpClient.get<User>('/api/current-user', { observe: 'response' }).pipe(
        map(response => {
          this.sessionManagerService.setToken(response.headers.get('Authorization'));
          this.currentUser = response.body;
          return response.body;
        })
    );
  }

  login(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>('/api/authenticate', credentials, { observe: 'response' }).pipe(
        catchError(error => {
          console.log(error);
          // TODO: show error notification
          return of(null);
        }),
        map(response => {
          this.sessionManagerService.setToken(response.headers.get('Authorization'));
          this.currentUser = response.body;
          this.messageBusService.emit<User>(MessageType.LOGIN, this.currentUser);
          return response.body;
        })
    );
  }

  logout(): Observable<null> {
    // TODO: Get logout URL from backend config
    this.sessionManagerService.clearToken();
    this.currentUser = null;
    this.messageBusService.emit(MessageType.LOGOUT);
    return of(null);
  }

  isAuthenticated(): boolean {
    return !!this.sessionManagerService.getToken();
  }

  getCurrentUser(): User {
    return this.currentUser;
  }
}
