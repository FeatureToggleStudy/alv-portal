import { Injectable } from '@angular/core';
import { AbstractAuthenticationGuard } from './abstract-authentication.guard';
import { AuthenticationService } from './authentication.service';
import { isNotAuthenticatedUser, User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedGuard extends AbstractAuthenticationGuard {

  constructor(authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  protected predicate(user: User): boolean {
    return isNotAuthenticatedUser(user);
  }

}
