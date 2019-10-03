import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  hasAnyAuthorities,
  hasFeature,
  isAnyUser,
  isAuthenticatedUser,
  isNotAuthenticatedUser,
  User,
  UserRole
} from '../../../core/auth/user.model';
import { MenuDefinition, MenuEntry } from './menu-entry.type';
import { IconKey } from '../../icons/custom-icon/custom-icon.component';
import { FeatureName } from '../../backend-services/feature-code-list/feature-code-list.types';
import { AppContext } from '../../../core/app-context/app-context.enum';
import {
  AppContextService,
  isCompetenceCatalog,
  isEalv
} from '../../../core/app-context/app-context.service';

interface UserMenuDefinition {
  id: string;
  mainMenuEntryKeys: string[];
  onlineFormsMenuEntryKeys?: string[];
  settingsMenuEntryKeys?: string[];
  userPredicate: (user: User) => boolean;
  appContextPredicate: (appContext: AppContext) => boolean;
}

const USER_MENU_DEFINITIONS: UserMenuDefinition[] = [
  {
    id: 'ANONYM',
    mainMenuEntryKeys: ['home', 'job-search', 'candidate-search', 'job-publication'],
    onlineFormsMenuEntryKeys: [],
    settingsMenuEntryKeys: [],
    userPredicate: isNotAuthenticatedUser,
    appContextPredicate: isEalv
  },
  {
    id: 'STES',
    mainMenuEntryKeys: ['dashboard', 'job-search', 'job-search-profiles', 'job-favourites'],
    onlineFormsMenuEntryKeys: ['work-efforts', 'application-documents'],
    settingsMenuEntryKeys: ['user-settings'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_JOB_SEEKER]),
    appContextPredicate: isEalv
  },
  {
    id: 'PAV',
    mainMenuEntryKeys: ['dashboard', 'candidate-search', 'candidate-search-profiles', 'job-publication', 'manage-job-ads', 'job-search', 'job-search-profiles', 'job-favourites'],
    onlineFormsMenuEntryKeys: [],
    settingsMenuEntryKeys: ['user-settings'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_PAV]),
    appContextPredicate: isEalv
  },
  {
    id: 'COMPANY',
    mainMenuEntryKeys: ['dashboard', 'candidate-search', 'candidate-search-profiles', 'job-publication', 'manage-job-ads', 'job-search', 'job-search-profiles', 'job-favourites'],
    onlineFormsMenuEntryKeys: [],
    settingsMenuEntryKeys: ['user-settings'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_COMPANY]),
    appContextPredicate: isEalv
  },
  {
    id: 'CC',
    mainMenuEntryKeys: ['competence-sets', 'competence-elements'],
    onlineFormsMenuEntryKeys: [],
    settingsMenuEntryKeys: [],
    userPredicate: (u) => true,
    appContextPredicate: isCompetenceCatalog
  }
];

const MAIN_MENU_ENTRIES: Array<MenuEntry> = [
  {
    id: 'home',
    iconProp: ['fas', 'home'],
    labelKey: 'global.menu.home',
    path: ['home'],
    userPredicate: isNotAuthenticatedUser
  },
  {
    id: 'dashboard',
    iconProp: ['fas', 'home'],
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
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_COMPANY, UserRole.ROLE_PAV, UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN])
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
  },
  {
    id: 'competence-sets',
    iconProp: ['far', 'list-alt'],
    labelKey: 'portal.competence-catalog.menu-entries.competence-sets',
    path: ['kk', 'sets'],
    userPredicate: (u) => isAnyUser() //fixme should be only user with kk rights
  },
  {
    id: 'competence-elements',
    iconProp: ['fas', 'list-ul'],
    labelKey: 'portal.competence-catalog.menu-entries.competence-elements',
    path: ['kk', 'elements'],
    userPredicate: (u) => isAnyUser() //fixme should be only user with kk rights
  }
];

const ONLINE_FORMS_MENU_ENTRIES: Array<MenuEntry> = [
  {
    id: 'work-efforts',
    iconKey: IconKey.WORK_EFFORTS,
    labelKey: 'portal.navigation.menu-entry.work-efforts',
    path: ['work-efforts'],
    userPredicate: (u) => hasFeature(u, FeatureName.NPA)
  },
  {
    id: 'application-documents',
    iconProp: ['fas', 'file-certificate'],
    labelKey: 'portal.navigation.menu-entry.application-documents',
    path: ['application-documents'],
    userPredicate: (u) => hasFeature(u, FeatureName.BU)
  }
];

const SETTINGS_MENU_ENTRIES: Array<MenuEntry> = [
  {
    id: 'user-settings',
    iconProp: ['fas', 'cog'],
    labelKey: 'portal.navigation.menu-entry.user-settings',
    path: ['user-settings'],
    userPredicate: isAuthenticatedUser
  },
  {
    id: 'user-info',
    iconProp: ['fas', 'user'],
    labelKey: 'portal.navigation.menu-entry.admin.user-info',
    path: ['admin', 'user-info'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'system-notifications',
    iconProp: ['fas', 'comment-alt'],
    labelKey: 'portal.navigation.menu-entry.admin.system-notifications',
    path: ['admin', 'system-notifications'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'legal-terms-management',
    iconProp: ['fas', 'balance-scale'],
    labelKey: 'portal.navigation.menu-entry.admin.legal-terms',
    path: ['admin', 'legal-terms-management'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'api-user-management',
    iconProp: ['fas', 'users'],
    labelKey: 'portal.navigation.menu-entry.admin.api-user-management',
    path: ['admin', 'api-user-management'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'blacklist',
    iconProp: ['fas', 'ban'],
    labelKey: 'portal.navigation.menu-entry.admin.blacklist',
    path: ['admin', 'blacklist'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'api-doc',
    iconProp: ['fas', 'book'],
    labelKey: 'portal.navigation.menu-entry.admin.api-doc',
    path: ['admin', 'api-doc'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'elastic-search-reindex',
    iconProp: ['fas', 'sync'],
    labelKey: 'portal.navigation.menu-entry.admin.elastic-search-reindex',
    path: ['admin', 'elastic-search-reindex'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_SYSADMIN])
  },
  {
    id: 'audits',
    iconProp: ['fas', 'bell'],
    labelKey: 'portal.admin.audits.title',
    path: ['admin', 'audits'],
    userPredicate: (u) => hasAnyAuthorities(u, [UserRole.ROLE_SYSADMIN])
  }
];


@Injectable()
export class MenuEntryService {

  constructor(private authenticationService: AuthenticationService,
              private appContextService: AppContextService) {
  }

  public prepareEntries(): Observable<MenuDefinition> {
    return combineLatest(this.authenticationService.getCurrentUser(), this.appContextService.getAppContext()).pipe(
      map(([user, appContext]) => {
        const userMenuDefinition = USER_MENU_DEFINITIONS.find(e => e.userPredicate(user) && e.appContextPredicate(appContext));
        if (!userMenuDefinition) {
          return {
            mainMenuEntries: [],
            onlineFormsMenuEntries: [],
            settingsMenuEntries: []
          };
        }
        const mainMenuEntries = MAIN_MENU_ENTRIES
          .filter(m => userMenuDefinition.mainMenuEntryKeys.includes(m.id))
          .filter(m => m.userPredicate(user))
          .filter(entry => entry);

        const onlineFormsMenuEntries = ONLINE_FORMS_MENU_ENTRIES
          .filter(m => userMenuDefinition.onlineFormsMenuEntryKeys.includes(m.id))
          .filter(m => m.userPredicate(user))
          .filter(entry => entry);

        const settingsMenuEntries = SETTINGS_MENU_ENTRIES
          .filter(m => userMenuDefinition.settingsMenuEntryKeys.includes(m.id))
          .filter(m => m.userPredicate(user))
          .filter(entry => entry);
        return {
          mainMenuEntries: mainMenuEntries,
          onlineFormsMenuEntries: onlineFormsMenuEntries,
          settingsMenuEntries: settingsMenuEntries
        };
      })
    );
  }

}
