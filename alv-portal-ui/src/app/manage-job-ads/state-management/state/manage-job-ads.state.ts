import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ManagedJobAdsSearchFilter {
  query: string;
  onlineSinceDays: number;
}

export interface ManageJobAdsState {
  totalCount: number;
  page: number;
  filter: ManagedJobAdsSearchFilter;
  resultList: JobAdvertisement[];
  selectedJobAdvertisement: JobAdvertisement;
  resultsAreLoading: boolean;
}

export const initialState: ManageJobAdsState = {
  totalCount: 0,
  page: 0,
  filter: {
    query: null,
    onlineSinceDays: null
  },
  resultList: [],
  selectedJobAdvertisement: null,
  resultsAreLoading: false,
};

export const getManageJobAdsState = createFeatureSelector<ManageJobAdsState>('manageJobAds');
export const getManagedJobAdsSearchFilter = createSelector(getManageJobAdsState, (state: ManageJobAdsState) => state.filter);
export const getManagedJobAdResults = createSelector(getManageJobAdsState, (state: ManageJobAdsState) => state.resultList);
