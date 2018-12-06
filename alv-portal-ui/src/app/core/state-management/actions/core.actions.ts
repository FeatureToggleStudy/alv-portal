import { Action } from '@ngrx/store';
import { User } from '../../auth/user.model';
import { HttpErrorResponse } from '@angular/common/http';

export const LANGUAGE_CHANGED = 'CORE:LANGUAGE_CHANGED';
export const LANGUAGE_INITIALIZED = 'CORE:LANGUAGE_INITIALIZED';
export const LOAD_CURRENT_USER = 'CORE:LOAD_CURRENT_USER';
export const CURRENT_USER_LOADED = 'CORE:CURRENT_USER_LOADED';
export const LOGOUT_USER = 'CORE:LOGOUT_USER';
export const TOGGLE_MAIN_NAVIGATION = 'CORE:TOGGLE_MAIN_NAVIGATION';
export const EFFECT_ERROR_OCCURRED = 'CORE:EFFECT_ERROR_OCCURRED';

export class LanguageChangedAction implements Action {
  readonly type = LANGUAGE_CHANGED;

  constructor(public payload: { language: string }) {
  }
}

export class LoadCurrentUserAction implements Action {
  readonly type = LOAD_CURRENT_USER;

  constructor(public payload: { jwt?: string }) {
  }
}

export class CurrentUserLoadedAction implements Action {
  readonly type = CURRENT_USER_LOADED;

  constructor(public payload: { currentUser: User }) {
  }
}

export class LogoutUserAction implements Action {
  readonly type = LOGOUT_USER;

  constructor(public payload: {}) {
  }
}

export class LanguageInitializedAction implements Action {
  readonly type = LANGUAGE_INITIALIZED;

  constructor(public payload: { language: string }) {
  }
}

export class ToggleMainNavigationAction implements Action {
  readonly type = TOGGLE_MAIN_NAVIGATION;

  constructor(public payload: { expanded?: boolean }) {
  }
}

export class EffectErrorOccurredAction implements Action {
  readonly type = EFFECT_ERROR_OCCURRED;

  constructor(public payload: { httpError: HttpErrorResponse }) {
  }
}
