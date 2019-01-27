import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  hasAnyAuthorities,
  isAnyUser,
  isAuthenticatedUser,
  isNotAuthenticatedUser,
  UserRole
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
  },
  {
    icon: 'search',
    labelKey: 'portal.navigation.menu-entry.candidate-search',
    path: ['candidate-search'],
    userPredicate: isAnyUser
  },
  {
    icon: 'edit',
    labelKey: 'portal.navigation.menu-entry.job-publication',
    path: ['job-publication'],
    userPredicate: isAnyUser
  },
  {
    icon: 'table',
    labelKey: 'portal.navigation.menu-entry.manage-job-ads',
    path: ['manage-job-ads'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_COMPANY, UserRole.ROLE_PAV])
  },
  {
    icon: 'user',
    labelKey: 'portal.admin.user-info.menu-entry',
    path: ['admin', 'user-info'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN])
  },
  {
    icon: 'users',
    labelKey: 'portal.admin.api-user-management.menu-entry',
    path: ['admin', 'api-user-management'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN])
  }
];

@Injectable()
export class MenuEntryService {

  constructor(private authenticationService: AuthenticationService) {
  }

  public prepareEntries(): Observable<MenuEntry[]> {
    return this.authenticationService.getCurrentUser().pipe(
      map((user) => {
        return MENU_ENTRIES.filter(m => m.userPredicate(user));
      })
    );
  }

}
