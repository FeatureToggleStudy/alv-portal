import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../auth/user.model';

export const initialState: CoreState = {
  currentLanguage: null,
  currentUser: null,
  mainNavigationExpanded: false
};

export interface CoreState {
  currentLanguage: string;
  currentUser: User;
  mainNavigationExpanded: boolean;
}

const getCoreState = createFeatureSelector<CoreState>('coreState');

export const getCurrentLanguage = createSelector(getCoreState, (state: CoreState) => state.currentLanguage);
export const getCurrentUser = createSelector(getCoreState, (state: CoreState) => state.currentUser);
export const getMainNavigationExpanded = createSelector(getCoreState, (state: CoreState) => state.mainNavigationExpanded);
