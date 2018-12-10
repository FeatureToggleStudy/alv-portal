import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { isAuthenticatedUser, User } from './user.model';
import { AbstractAuthenticationGuard } from './abstract-authentication.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard extends AbstractAuthenticationGuard {

  constructor(authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  protected predicate(user: User): boolean {
    return isAuthenticatedUser(user);
  }
}
