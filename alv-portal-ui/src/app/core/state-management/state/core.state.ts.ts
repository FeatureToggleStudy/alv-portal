import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../auth/user.model';
import {
  Accountability,
  CompanyContactTemplate
} from '../../../shared/backend-services/user-info/user-info.types';
import { CompanyContactTemplateModel } from '../../auth/company-contact-template-model';

export const initialState: CoreState = {
  currentLanguage: null,
  currentUser: undefined,
  currentCompanyContactTemplate: undefined,
  accountabilities: undefined,
  mainNavigationExpanded: false
};

export interface CoreState {
  currentLanguage: string;
  currentUser: User;
  currentCompanyContactTemplate: CompanyContactTemplate;
  accountabilities: Accountability[];
  mainNavigationExpanded: boolean;
}

const getCoreState = createFeatureSelector<CoreState>('coreState');

export const getCurrentLanguage = createSelector(getCoreState, (state: CoreState) => state.currentLanguage);
export const getCurrentUser = createSelector(getCoreState, (state: CoreState) => state.currentUser);
export const getCurrentCompanyContactTemplate = createSelector(getCoreState, (state: CoreState) => state.currentCompanyContactTemplate);
export const getMainNavigationExpanded = createSelector(getCoreState, (state: CoreState) => state.mainNavigationExpanded);
export const getCurrentCompanyContactTemplateModel = createSelector(getCurrentUser, getCurrentCompanyContactTemplate, (user, companyContactTemplate) => {
  if (companyContactTemplate && user) {
    return new CompanyContactTemplateModel(companyContactTemplate, user);
  }
  return null;
});

export const userNotFetched = (u: User) => {
  return u === undefined;
};
