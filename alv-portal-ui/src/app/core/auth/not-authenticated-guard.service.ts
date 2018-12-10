import { Injectable } from '@angular/core';
import { AbstractAuthenticationGuard } from './abstract-authentication-guard';
import { AuthenticationService } from './authentication.service';
import { anyNotAuthenticatedUser, User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedGuardService extends AbstractAuthenticationGuard {

  constructor(authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  protected predicate(user: User): boolean {
    return anyNotAuthenticatedUser(user);
  }

}
