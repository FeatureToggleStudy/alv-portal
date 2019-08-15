import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  hasAnyAuthorities,
  isAnyUser,
  isAuthenticatedUser,
  isNotAuthenticatedUser,
  User,
  UserRole
} from '../../../core/auth/user.model';
import { MenuDefinition, MenuEntry } from './menu-entry.type';
import { IconKey } from '../../icons/custom-icon/custom-icon.component';
import { ProfileInfoService } from '../header/profile-info.service';

interface UserMenuDefinition {
  id: string;
  mainMenuEntryKeys: string[];
  onlineFormsMenuEntryKeys?: string[];
  settingsMenuEntryKeys?: string[];
  userPredicate: (user: User) => boolean;
}

const USER_MENU_DEFINITIONS: UserMenuDefinition[] = [
  {
    id: 'ANONYM',
    mainMenuEntryKeys: ['home', 'job-search', 'candidate-search', 'job-publication'],
    onlineFormsMenuEntryKeys: [],
    settingsMenuEntryKeys: [],
    userPredicate: isNotAuthenticatedUser
  },
  {
    id: 'STES',
    mainMenuEntryKeys: ['dashboard', 'job-search', 'job-search-profiles', 'job-favourites'],
    onlineFormsMenuEntryKeys: ['work-efforts', 'application-documents'],
    settingsMenuEntryKeys: ['user-settings'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_JOB_SEEKER])
  },
  {
    id: 'PAV',
    mainMenuEntryKeys: ['dashboard', 'candidate-search', 'candidate-search-profiles', 'job-publication', 'manage-job-ads', 'job-search', 'job-search-profiles', 'job-favourites'],
    onlineFormsMenuEntryKeys: [],
    settingsMenuEntryKeys: ['user-settings'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_PAV])
  },
  {
    id: 'COMPANY',
    mainMenuEntryKeys: ['dashboard', 'candidate-search', 'candidate-search-profiles', 'job-publication', 'manage-job-ads', 'job-search', 'job-search-profiles', 'job-favourites'],
    onlineFormsMenuEntryKeys: [],
    settingsMenuEntryKeys: ['user-settings'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_COMPANY])
  }
];

const MAIN_MENU_ENTRIES: Array<MenuEntry> = [
  {
    id: 'home',
    iconClass: 'home',
    labelKey: 'global.menu.home',
    path: ['home'],
    userPredicate: isNotAuthenticatedUser
  },
  {
    id: 'dashboard',
    iconClass: 'home',
    labelKey: 'global.menu.home',
    path: ['dashboard'],
    userPredicate: isAuthenticatedUser
  },
  {
    id: 'candidate-search',
    iconKey: IconKey.CANDIDATE_SEARCH,
    labelKey: 'portal.navigation.menu-entry.candidate-search',
    path: ['candidate-search'],
    userPredicate: (u) => isNotAuthenticatedUser(u) || hasAnyAuthorities(u, [UserRole.ROLE_COMPANY, UserRole.ROLE_PAV, UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'candidate-search-profiles',
    iconKey: IconKey.CANDIDATE_SEARCH_PROFILES,
    labelKey: 'portal.navigation.menu-entry.candidate-search-profiles',
    path: ['candidate-search-profiles'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_COMPANY, UserRole.ROLE_PAV, UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'job-publication',
    iconKey: IconKey.JOB_PUBLICATION,
    labelKey: 'portal.navigation.menu-entry.job-publication',
    path: ['job-publication'],
    userPredicate: (u) => isNotAuthenticatedUser(u) || hasAnyAuthorities(u, [UserRole.ROLE_COMPANY, UserRole.ROLE_PAV, UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'job-search',
    iconKey: IconKey.JOB_AD_SEARCH,
    labelKey: 'portal.navigation.menu-entry.job-search',
    path: ['job-search'],
    userPredicate: isAnyUser
  },
  {
    id: 'manage-job-ads',
    iconKey: IconKey.MANAGE_JOB_ADS,
    labelKey: 'portal.navigation.menu-entry.manage-job-ads',
    path: ['manage-job-ads'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_COMPANY, UserRole.ROLE_PAV])
  },
  {
    id: 'job-search-profiles',
    iconKey: IconKey.JOB_AD_SEARCH_PROFILES,
    labelKey: 'portal.navigation.menu-entry.job-ad-search-profiles',
    path: ['job-search-profiles'],
    userPredicate: isAuthenticatedUser
  },
  {
    id: 'job-favourites',
    iconKey: IconKey.JOB_AD_FAVOURITES,
    labelKey: 'portal.navigation.menu-entry.job-ad-favourites',
    path: ['job-favourites'],
    userPredicate: (u) => isAuthenticatedUser(u)
  }
];

const ONLINE_FORMS_MENU_ENTRIES: Array<MenuEntry> = [
  {
    id: 'work-efforts',
    iconKey: IconKey.WORK_EFFORTS,
    labelKey: 'portal.navigation.menu-entry.work-efforts',
    path: ['work-efforts'],
    userPredicate: (u) => isAuthenticatedUser(u)
  },
  {
    id: 'application-documents',
    iconClass: 'award',
    labelKey: 'portal.navigation.menu-entry.application-documents',
    path: ['application-documents'],
    userPredicate: (u) => isAuthenticatedUser(u)
  }
];

const SETTINGS_MENU_ENTRIES: Array<MenuEntry> = [
  {
    id: 'user-settings',
    iconClass: 'cog',
    labelKey: 'portal.navigation.menu-entry.user-settings',
    path: ['user-settings'],
    userPredicate: isAuthenticatedUser
  },
  {
    id: 'user-info',
    iconClass: 'user',
    labelKey: 'portal.navigation.menu-entry.admin.user-info',
    path: ['admin', 'user-info'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'system-notifications',
    iconClass: 'comment-alt',
    labelKey: 'portal.navigation.menu-entry.admin.system-notifications',
    path: ['admin', 'system-notifications'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'legal-terms-management',
    iconClass: 'balance-scale',
    labelKey: 'portal.navigation.menu-entry.admin.legal-terms',
    path: ['admin', 'legal-terms-management'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'api-user-management',
    iconClass: 'users',
    labelKey: 'portal.navigation.menu-entry.admin.api-user-management',
    path: ['admin', 'api-user-management'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'blacklist',
    iconClass: 'ban',
    labelKey: 'portal.navigation.menu-entry.admin.blacklist',
    path: ['admin', 'blacklist'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'api-doc',
    iconClass: 'book',
    labelKey: 'portal.navigation.menu-entry.admin.api-doc',
    path: ['admin', 'api-doc'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'elastic-search-reindex',
    iconClass: 'sync',
    labelKey: 'portal.navigation.menu-entry.admin.elastic-search-reindex',
    path: ['admin', 'elastic-search-reindex'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'audits',
    iconClass: 'bell',
    labelKey: 'portal.admin.audits.title',
    path: ['admin', 'audits'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_SYSADMIN])
  }
];


@Injectable()
export class MenuEntryService {

  constructor(private authenticationService: AuthenticationService,
              private profileInfoService: ProfileInfoService) {
  }

  public prepareEntries(): Observable<MenuDefinition> {
    return combineLatest(
      this.authenticationService.getCurrentUser(),
      this.profileInfoService.getProfileInfo()).pipe(
      map(([user, profileInfo]) => {
        const userMenuDefinition = USER_MENU_DEFINITIONS.find(e => e.userPredicate(user));
        const mainMenuEntries = MAIN_MENU_ENTRIES.filter(m => m.userPredicate(user));
        const onlineFormsMenuEntries = profileInfo.inProduction ? [] :
          ONLINE_FORMS_MENU_ENTRIES.filter(m => m.userPredicate(user));
        const settingsMenuEntries = SETTINGS_MENU_ENTRIES.filter(m => m.userPredicate(user));
        if (!userMenuDefinition) {
          return {
            mainMenuEntries: mainMenuEntries,
            onlineFormsMenuEntries: onlineFormsMenuEntries,
            settingsMenuEntries: settingsMenuEntries
          };
        }
        return {
          mainMenuEntries: userMenuDefinition.mainMenuEntryKeys.map(value => {
            return mainMenuEntries.find(m => m.id === value);
          }).filter(entry => entry),
          onlineFormsMenuEntries: userMenuDefinition.onlineFormsMenuEntryKeys.map(value => {
            return onlineFormsMenuEntries.find(m => m.id === value);
          }).filter(entry => entry),
          settingsMenuEntries: userMenuDefinition.settingsMenuEntryKeys.map(value => {
            return settingsMenuEntries.find(m => m.id === value);
          }).filter(entry => entry)
        };
      })
    );
  }

}
