import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  isAnyUser,
  isAuthenticatedUser,
  isNotAuthenticatedUser
} from '../../../core/auth/user.model';
import { MenuEntry } from './menu-entry.type';


const MENU_ENTRIES: Array<MenuEntry> = [
  {
    icon: 'home',
    labelKey: 'global.menu.home',
    path: ['home'],
    userPredicate: isNotAuthenticatedUser
  },
  {
    icon: 'home',
    labelKey: 'global.menu.home',
    path: ['dashboard'],
    userPredicate: isAuthenticatedUser
  },
  {
    icon: 'search',
    labelKey: 'portal.navigation.menu-entry.job-search',
    path: ['job-search'],
    userPredicate: isAnyUser
  }
];

@Injectable()
export class MenuEntryService {

  constructor(private authenticationService: AuthenticationService) {
  }

  public prepareEntries(): Observable<Array<MenuEntry>> {
    return this.authenticationService.getCurrentUser().pipe(
      map((user) => {
        return MENU_ENTRIES.filter(m => m.userPredicate(user));
      })
    );
  }

}
