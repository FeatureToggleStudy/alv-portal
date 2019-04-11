import { initialState, ManageJobAdsState } from '../state';
import {
  Actions,
  APPLY_FILTER,
  FILTER_APPLIED,
  INITIALIZE_RESULT_LIST,
  JOB_ADVERTISEMENT_CANCELLED,
  JOB_ADVERTISEMENT_DETAIL_LOADED,
  LOAD_NEXT_PAGE,
  NEXT_PAGE_LOADED,
  RESET,
  RESULT_LIST_INITIALIZED
} from '../actions';
import { JobAdvertisement } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';

function matchesSelectedJobAd(selectedJobAdvertisement: JobAdvertisement, updatedJobAd: JobAdvertisement) {
  return selectedJobAdvertisement && selectedJobAdvertisement.id === updatedJobAd.id;
}

export function manageJobAdsReducer(state = initialState, action: Actions): ManageJobAdsState {

  let newState: ManageJobAdsState;

  switch (action.type) {

    case INITIALIZE_RESULT_LIST:
      newState = {
        ...state,
        resultsAreLoading: true
      };
      break;

    case RESULT_LIST_INITIALIZED:
      newState = {
        ...state,
        resultsAreLoading: false,
        isDirtyResultList: false
      };
      break;

    case RESET:
      newState = {
        ...initialState
      };
      break;

    case APPLY_FILTER:
      newState = {
        ...state,
        filter: {
          ...action.payload
        },
        page: 0,
        resultsAreLoading: true,
      };
      break;

    case FILTER_APPLIED:
      newState = {
        ...state,
        resultList: [...action.payload.page],
        totalCount: action.payload.totalCount,
        resultsAreLoading: false,
        isDirtyResultList: false
      };
      break;

    case LOAD_NEXT_PAGE:
      newState = {
        ...state,
        resultsAreLoading: true
      };
      break;

    case NEXT_PAGE_LOADED:
      newState = {
        ...state,
        resultList: [...state.resultList, ...action.payload.page],
        page: state.page + 1,
        resultsAreLoading: false
      };
      break;

    case JOB_ADVERTISEMENT_DETAIL_LOADED:
      newState = {
        ...state,
        selectedJobAdvertisement: action.payload.jobAdvertisement
      };
      break;

    case JOB_ADVERTISEMENT_CANCELLED:
      const updatedJobAd = action.payload.jobAdvertisement;
      const patchedJobAd = matchesSelectedJobAd(state.selectedJobAdvertisement, updatedJobAd) ? updatedJobAd : state.selectedJobAdvertisement;
      const idx = state.resultList.map(value => value.id).findIndex(value => value === updatedJobAd.id);
      const patchedResultList = [...state.resultList];
      if (idx > -1) {
        const currentJobAd = patchedResultList[idx];
        patchedResultList[idx] = {
          ...updatedJobAd,
          owner: currentJobAd.owner
        };
      }
      newState = {
        ...state,
        resultList: patchedResultList,
        selectedJobAdvertisement: patchedJobAd
      };
      break;

    default:
      newState = state;
  }

  return newState;
}
