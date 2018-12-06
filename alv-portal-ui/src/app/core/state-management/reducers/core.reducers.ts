import { CoreState, initialState } from '../state/core.state.ts';
import {
  CURRENT_USER_LOADED,
  CurrentUserLoadedAction,
  LANGUAGE_CHANGED,
  LANGUAGE_INITIALIZED,
  LanguageChangedAction,
  LanguageInitializedAction,
  LOGOUT_USER,
  LogoutUserAction,
  TOGGLE_MAIN_NAVIGATION,
  ToggleMainNavigationAction
} from '../actions/core.actions';

export function coreReducers(state: CoreState = initialState, action: Actions): CoreState {

  let newState: CoreState;

  switch (action.type) {
    case LANGUAGE_INITIALIZED:
      newState = {
        ...state,
        currentLanguage: action.payload.language
      };
      break;
    case LANGUAGE_CHANGED:
      newState = {
        ...state,
        currentLanguage: action.payload.language
      };
      break;
    case CURRENT_USER_LOADED:
      newState = {
        ...state,
        currentUser: action.payload.currentUser
      };
      break;
    case LOGOUT_USER:
      newState = {
        ...state,
        currentUser: null
      };
      break;
    case TOGGLE_MAIN_NAVIGATION:
      newState = {
        ...state,
        mainNavigationExpanded: action.payload.expanded !== undefined ? action.payload.expanded : !state.mainNavigationExpanded
      };
      break;
    default:
      newState = state;
  }

  return newState;

}

export type Actions =
  | LanguageChangedAction
  | LanguageInitializedAction
  | CurrentUserLoadedAction
  | LogoutUserAction
  | ToggleMainNavigationAction
  ;

