import { ContractType, JobSearchFilter, Sort } from '../../job-search-filter.types';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface JobAdSearchState {
  totalCount: number,
  page: number;
  jobSearchFilter: JobSearchFilter
  resultList: JobAdvertisement[],
  currentJobAd: JobAdvertisement,
  resultsAreLoading: boolean,
  visitedJobAds: { [id: string]: boolean; }
}

export const initialState: JobAdSearchState = {
  totalCount: 0,
  page: 0,
  jobSearchFilter: {
    sort: Sort.DATE_ASC,
    displayRestricted: false,
    contractType: ContractType.ALL,
    workloadPercentageMin: 0,
    workloadPercentageMax: 80,
    company: null,
    onlineSince: 30,
  },
  resultList: [],
  currentJobAd: null,
  resultsAreLoading: false,
  visitedJobAds: {}
};

export interface JobSearchResult {
  jobAdvertisement: JobAdvertisement,
  visited: boolean
}

export const getJobAdSearchState = createFeatureSelector<JobAdSearchState>('jobAdSearch');
export const getTotalCount = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.totalCount);
export const getResultList = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.resultList);
export const getVisitedJobAds = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.visitedJobAds);
export const getJobSearchFilter = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.jobSearchFilter);
export const getCurrentJobAd = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.currentJobAd);

export const getResultsAreLoading = createSelector(getJobAdSearchState, (state: JobAdSearchState) => state.resultsAreLoading);

export const getJobSearchResults = createSelector(getResultList, getVisitedJobAds, (resultList, visitedJobAds) => {
  return resultList.map((jobAd) => {
    return {
      jobAdvertisement: jobAd,
      visited: visitedJobAds[jobAd.id] || false
    }
  })
});


export const getPrevId = createSelector(getResultList, getCurrentJobAd, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx > 0 ? ids[idx - 1] : null;
  }

  return null;
});

export const getNextId = createSelector(getResultList, getCurrentJobAd, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.id);
    const idx = ids.findIndex(id => id === current.id);

    return idx < ids.length - 1 ? ids[idx + 1] : null;
  }

  return null;
});

export const isPrevVisible = createSelector(getResultList, getCurrentJobAd, (resultList, current) => {
  if (current) {
    const ids = resultList.map((item) => item.id);
    return ids.findIndex(id => id === current.id) > 0;
  }

  return false;
});

export const isNextVisible = createSelector(getResultList, getCurrentJobAd, getTotalCount, (resultList, current, totalCount) => {
  if (current) {
    const ids = resultList.map((item) => item.id);
    return ids.findIndex(id => id === current.id) < totalCount - 1;
  }

  return false;
});
