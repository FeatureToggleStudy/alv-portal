import { JobAdvertisement } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export enum MangedJobAdsSort {
  STELLEN_NUMMER_EGOV = 'jobAdvertisement.stellennummerEgov',
  STELLEN_NUMMER_AVAM = 'jobAdvertisement.stellennummerAvam',
  MELDE_DATUM = 'jobAdvertisement.publication.startDate'
}

export enum SortDirection {
  DESC = 'DESC',
  ASC = 'ASC'
}


export interface ManagedJobAdsSearchFilter {
  query: string;
  onlineSinceDays: number;
  sort: {
    column: MangedJobAdsSort,
    direction: SortDirection
  };
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
    onlineSinceDays: null,
    sort: {
      column: MangedJobAdsSort.MELDE_DATUM,
      direction: SortDirection.DESC
    }
  },
  resultList: [],
  selectedJobAdvertisement: null,
  resultsAreLoading: false,
};

export const getManageJobAdsState = createFeatureSelector<ManageJobAdsState>('manageJobAds');
export const getManagedJobAdsSearchFilter = createSelector(getManageJobAdsState, (state: ManageJobAdsState) => state.filter);
export const getManagedJobAdResults = createSelector(getManageJobAdsState, (state: ManageJobAdsState) => state.resultList);
export const getManagedJobAdTotalCount = createSelector(getManageJobAdsState, (state: ManageJobAdsState) => state.totalCount);
export const getSelectedJobAdvertisement = createSelector(getManageJobAdsState, (state: ManageJobAdsState) => state.selectedJobAdvertisement);

export const getPrevId = createSelector(getManagedJobAdResults, getSelectedJobAdvertisement, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx > 0 ? ids[idx - 1] : null;
  }

  return null;
});

export const getNextId = createSelector(getManagedJobAdResults, getSelectedJobAdvertisement, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx < ids.length - 1 ? ids[idx + 1] : null;
  }

  return null;
});

export const isPrevVisible = createSelector(getManagedJobAdResults, getSelectedJobAdvertisement, (resultList, selectedJobAdvertisement) => {
  if (selectedJobAdvertisement) {
    return resultList
      .map((item) => item.id)
      .findIndex(id => id === selectedJobAdvertisement.id) > 0;
  }

  return false;
});

export const isNextVisible = createSelector(getManagedJobAdResults, getSelectedJobAdvertisement, getManagedJobAdTotalCount, (resultList, current, totalCount) => {
  if (current) {
    return resultList
      .map((item) => item.id)
      .findIndex(id => id === current.id) < totalCount - 1;
  }

  return false;
});

