import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuDefinition } from './menu-entry.type';
import { AppContextService } from '../../../core/app-context/app-context.service';
import { USER_MENU_DEFINITIONS } from './user-menu-definitions';
import { MENU_ENTRIES } from './menu-entries';

@Injectable()
export class MenuEntryService {

  constructor(private authenticationService: AuthenticationService,
              private appContextService: AppContextService) {
  }

  prepareEntries(): Observable<MenuDefinition> {
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
        const mainMenuEntries = MENU_ENTRIES[appContext].mainMenuEntries
          .filter(m => userMenuDefinition.mainMenuEntryKeys.includes(m.id))
          .filter(m => m.userPredicate(user))
          .filter(entry => entry);

        const onlineFormsMenuEntries = MENU_ENTRIES[appContext].onlineFormsMenuEntries
          .filter(m => userMenuDefinition.onlineFormsMenuEntryKeys.includes(m.id))
          .filter(m => m.userPredicate(user))
          .filter(entry => entry);

        const settingsMenuEntries = MENU_ENTRIES[appContext].settingsMenuEntries
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
