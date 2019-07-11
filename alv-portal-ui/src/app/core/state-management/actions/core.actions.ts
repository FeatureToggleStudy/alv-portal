import { Action } from '@ngrx/store';
import { User } from '../../auth/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Accountability,
  CompanyContactTemplate
} from '../../../shared/backend-services/user-info/user-info.types';
import { FavouriteItem } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';

export const LANGUAGE_CHANGED = 'CORE:LANGUAGE_CHANGED';
export const LANGUAGE_INITIALIZED = 'CORE:LANGUAGE_INITIALIZED';
export const LOAD_CURRENT_USER = 'CORE:LOAD_CURRENT_USER';
export const CURRENT_USER_LOADED = 'CORE:CURRENT_USER_LOADED';
export const LOGOUT_USER = 'CORE:LOGOUT_USER';
export const TOGGLE_MAIN_NAVIGATION = 'CORE:TOGGLE_MAIN_NAVIGATION';
export const TOGGLE_MOBILE_NAVIGATION = 'CORE:TOGGLE_MOBILE_NAVIGATION';
export const EFFECT_ERROR_OCCURRED = 'CORE:EFFECT_ERROR_OCCURRED';
export const SESSION_EXPIRED = 'CORE:SESSION_EXPIRED';
export const ACCOUNTABILITY_SELECTED = 'CORE:ACCOUNTABILITY_SELECTED';
export const LOAD_ACCOUNTABILITIES = 'CORE:LOAD_ACCOUNTABILITIES';
export const ACCOUNTABILITIES_LOADED = 'CORE:ACCOUNTABILITIES_LOADED';
export const COMPANY_SELECTED = 'CORE:COMPANY_SELECTED';
export const SELECT_COMPANY = 'CORE:SELECT_COMPANY';

export const ADDED_JOB_AD_FAVOURITE = 'CORE:ADDED_JOB_AD_FAVOURITE';
export const REMOVED_JOB_AD_FAVOURITE = 'CORE:REMOVED_JOB_AD_FAVOURITE';
export const ADD_JOB_AD_FAVOURITE = 'CORE:ADD_JOB_AD_FAVOURITE';
export const REMOVE_JOB_AD_FAVOURITE = 'CORE:REMOVE_JOB_AD_FAVOURITE';

export const UPDATED_JOB_AD_FAVOURITE = 'CORE:UPDATED_JOB_AD_FAVOURITE';

export const LAZY_LOADED_MODULE_DESTROYED = 'CORE:LAZY_LOADED_MODULE_DESTROYED';

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


export class ToggleMobileNavigationsAction implements Action {
  readonly type = TOGGLE_MOBILE_NAVIGATION;

  constructor(public payload: {}) {
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

export class SessionExpiredAction implements Action {
  readonly type = SESSION_EXPIRED;

  constructor(public payload: {}) {
  }
}

export class AccountabilitySelectedAction implements Action {
  readonly type = ACCOUNTABILITY_SELECTED;

  constructor(public payload: { accountability?: Accountability }) {
  }

}

export class SelectCompanyAction implements Action {
  readonly type = SELECT_COMPANY;

  constructor(public payload: { companySelection: CompanySelection }) {
  }

}

export class CompanySelectedAction implements Action {
  readonly type = COMPANY_SELECTED;

  constructor(public payload: { company: CompanyContactTemplate }) {
  }

}

export class LoadAccountabilities implements Action {
  readonly type = LOAD_ACCOUNTABILITIES;

  constructor(public payload: { userId: string }) {
  }

}

export class AcountabilitiesLoaded implements Action {
  readonly type = ACCOUNTABILITIES_LOADED;

  constructor(public payload: { accountabilities: Accountability[] }) {
  }

}

export class AddJobAdFavouriteAction implements Action {
  readonly type = ADD_JOB_AD_FAVOURITE;

  constructor(public payload: { jobAdvertisementId: string }) {
  }
}

export class AddedJobAdFavouriteAction implements Action {
  readonly type = ADDED_JOB_AD_FAVOURITE;

  constructor(public payload: { favouriteItem: FavouriteItem }) {
  }
}

export class UpdatedJobAdFavouriteAction implements Action {
  readonly type = UPDATED_JOB_AD_FAVOURITE;

  constructor(public payload: { favouriteItem: FavouriteItem }) {
  }
}

export class RemoveJobAdFavouriteAction implements Action {
  readonly type = REMOVE_JOB_AD_FAVOURITE;

  constructor(public payload: { favouriteItem: FavouriteItem }) {
  }
}

export class RemovedJobAdFavouriteAction implements Action {

  readonly type = REMOVED_JOB_AD_FAVOURITE;

  constructor(public payload: { removedFavouriteItem: FavouriteItem }) {
  }
}

/**
 * Action that is used to reset a Lazy-Loaded Module state
 */
export class LazyLoadedModuleDestroyedAction implements Action {
  readonly type = LAZY_LOADED_MODULE_DESTROYED;

  constructor(public payload: { moduleName: ModuleName }) {
  }

}

export enum ModuleName {
  JOB_AD_FAVOURITE = <any>'JOB_AD_FAVOURITE',
  JOB_SEARCH = <any>'JOB_SEARCH',
  MANAGE_JOB_AD = <any>'MANAGE_JOB_AD',
  CANDIDATE_SEARCH = <any>'CANDIDATE_SEARCH',
  JOB_PUBLICATION = <any>'JOB-PUBLICATION',
  JOB_SEARCH_PROFILES = <any>'JOB_SEARCH_PROFILES',
  CANDIDATE_SEARCH_PROFILES = <any>'CANDIDATE_SEARCH_PROFILES',
  WORK_EFFORTS = <any>'WORK_EFFORTS'
}

export interface CompanySelection {
  companyId: string;
  companyExternalId: string;
}

