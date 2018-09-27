import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Credentials, User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';
import { SessionManagerService } from './session-manager.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient,
              private sessionManagerService: SessionManagerService) {
  }

  getCurrentUser(force?: boolean): Observable<User> {
    if (force) {
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

  login(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>('/api/authenticate', credentials, { observe: 'response' }).pipe(
        flatMap(response => {
          this.sessionManagerService.setToken(response.headers.get('Authorization'));
          return this.getCurrentUser(true);
        })
    );
  }

  logout(): void {
    if (this.isAuthenticated()) {
      this.sessionManagerService.clearToken();
      this.currentUser.next(null);
    }
  }

  isAuthenticated(): boolean {
    return !!this.currentUser.getValue();
  }

}
