import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Credentials, RegistrationStatus, User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';
import { SessionManagerService } from './session-manager/session-manager.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient,
              private sessionManagerService: SessionManagerService) {
  }

  private static toUser(userDto) {
    const user = new User();
    user.id = userDto.id;
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.authorities = userDto.authorities;
    user.registrationStatus = userDto.registrationStatus;
    user.login = userDto.login;
    user.langKey = userDto.langKey;
    user.email = userDto.email;
    return user;
  }

  getCurrentUser(force?: boolean): Observable<User> {
    if (force) {
      return this.httpClient.get<UserDto>('/api/current-user', { observe: 'response' }).pipe(
          flatMap(response => {
            this.sessionManagerService.setToken(response.headers.get('Authorization'));
            this.currentUser.next(AuthenticationService.toUser(response.body));
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

class UserDto {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  langKey: string;
  authorities: Array<string>;
  registrationStatus: RegistrationStatus;
}

