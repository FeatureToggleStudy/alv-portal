import { JobAdvertisement } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ManagedJobAdsSearchFilter,
  ManagedJobAdsSortingColumn,
  SortDirection
} from '../../../../widgets/manage-job-ads-widget/job-ad-management-table/job-ad-management.table-types';

export interface ManageJobAdsState {
  totalCount: number;
  page: number;
  filter: ManagedJobAdsSearchFilter;
  resultList: JobAdvertisement[];
  selectedJobAdvertisement: JobAdvertisement;
  resultsAreLoading: boolean;
  isDirtyResultList: boolean;
}

export const initialState: ManageJobAdsState = {
  totalCount: 0,
  page: 0,
  filter: {
    query: null,
    onlineSinceDays: null,
    ownerUserId: null,
    status: null,
    sort: {
      column: ManagedJobAdsSortingColumn.PUBLICATION_DATE,
      direction: SortDirection.DESC
    }
  },
  resultList: [],
  selectedJobAdvertisement: null,
  resultsAreLoading: false,
  isDirtyResultList: true
};

export const getManageJobAdsState = createFeatureSelector<ManageJobAdsState>('manageJobAds');

export const getManagedJobAdsSearchFilter = createSelector(getManageJobAdsState, (state: ManageJobAdsState) => state.filter);

export const getManagedJobAdTotalCount = createSelector(getManageJobAdsState, (state: ManageJobAdsState) => state.totalCount);

export const getSelectedJobAdvertisement = createSelector(getManageJobAdsState, (state: ManageJobAdsState) => state.selectedJobAdvertisement);

export const isLoading = createSelector(getManageJobAdsState, (state: ManageJobAdsState) => state.resultsAreLoading);

const isDirtyResultList = createSelector(getManageJobAdsState, (state: ManageJobAdsState) => state.isDirtyResultList);

const getResultList = createSelector(getManageJobAdsState, (state: ManageJobAdsState) => state.resultList);

export const getManagedJobAdResults = createSelector(isDirtyResultList, getResultList, (dirty, resultList) => {
  if (dirty) {
    return undefined;
  }
  return resultList;
});

export const hasNextPage = createSelector(getManageJobAdsState, (state) => {
  return state.resultList.length < state.totalCount;
});

export const getPrevId = createSelector(getResultList, getSelectedJobAdvertisement, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx > 0 ? ids[idx - 1] : null;
  }

  return null;
});

export const getNextId = createSelector(getResultList, getSelectedJobAdvertisement, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx < ids.length - 1 ? ids[idx + 1] : null;
  }

  return null;
});

export const isPrevVisible = createSelector(getResultList, getSelectedJobAdvertisement, (resultList, selectedJobAdvertisement) => {
  if (selectedJobAdvertisement) {
    return resultList
      .map((item) => item.id)
      .findIndex(id => id === selectedJobAdvertisement.id) > 0;
  }

  return false;
});

export const isNextVisible = createSelector(getResultList, getSelectedJobAdvertisement, getManagedJobAdTotalCount, (resultList, current, totalCount) => {
  if (current) {
    return resultList
      .map((item) => item.id)
      .findIndex(id => id === current.id) < totalCount - 1;
  }

  return false;
});

