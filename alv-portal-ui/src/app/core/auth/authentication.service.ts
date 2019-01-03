import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RegistrationStatus, User, UserRole } from './user.model';
import { HttpClient } from '@angular/common/http';
import { ActionsSubject, select, Store } from '@ngrx/store';
import {
  CoreState,
  getCurrentCompanyContactTemplateModel,
  getCurrentUser,
  userNotFetched
} from '../state-management/state/core.state.ts';
import {
  CURRENT_USER_LOADED,
  CurrentUserLoadedAction,
  LoadCurrentUserAction,
  LogoutUserAction
} from '../state-management/actions/core.actions';
import { map, skipWhile, switchMap } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { CompanyContactTemplateModel } from './company-contact-template-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly currentUser$: Observable<User>;

  private readonly currentCompany$: Observable<CompanyContactTemplateModel>;

  constructor(private httpClient: HttpClient,
              private actionsSubject: ActionsSubject,
              private store: Store<CoreState>) {

    this.currentUser$ = this.store.pipe(
      select(getCurrentUser),
      skipWhile(userNotFetched)
    );

    this.currentCompany$ = this.store.pipe(
      select(getCurrentCompanyContactTemplateModel)
    );
  }

  init() {
    this.store.dispatch(new LoadCurrentUserAction({}));
  }

  reloadCurrentUser(jwt: string = null): Observable<User> {
    this.store.dispatch(new LoadCurrentUserAction(jwt ? { jwt: jwt } : {}));
    return this.actionsSubject.pipe(
      ofType(CURRENT_USER_LOADED),
      map((a: CurrentUserLoadedAction) => {
        return a.payload.currentUser;
      })
    );
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser$;
  }

  getCurrentCompany() {
    return this.currentCompany$;
  }

  localLogin(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>('/api/authenticate', credentials, { observe: 'response' }).pipe(
      switchMap(response => {
        return this.reloadCurrentUser(response.headers.get('Authorization'));
      })
    );
  }

  logout(): void {
    this.store.dispatch(new LogoutUserAction({}));
  }

}

export class UserDto {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  langKey: string;
  authorities: UserRole[];
  registrationStatus: RegistrationStatus;
}


export interface Credentials {
  username: string;
  password: string;
  rememberMe: boolean;
}
