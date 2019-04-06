import { initialState, JobAdSearchState } from '../state';
import {
  Actions,
  APPLY_FILTER,
  APPLY_FILTER_VALUES,
  APPLY_QUERY_VALUES,
  FILTER_APPLIED,
  JOB_ADVERTISEMENT_DETAIL_LOADED,
  LOAD_NEXT_PAGE,
  NEXT_PAGE_LOADED,
  OCCUPATION_LANGUAGE_CHANGED_ACTION,
  REMOVE_JOB_AD_FROM_FAVOURITES_SUCCESS,
  RESET_FILTER,
  UPDATE_JOB_ADVERTISEMENT
} from '../actions';
import { JobAdvertisementWithFavourites } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';

export function jobAdSearchReducer(state = initialState, action: Actions): JobAdSearchState {

  let newState: JobAdSearchState;

  switch (action.type) {

    case APPLY_QUERY_VALUES:
      newState = {
        ...state,
        jobSearchFilter: {
          ...(action.init ? initialState.jobSearchFilter : state.jobSearchFilter),
          ...action.payload
        }
      };
      break;

    case APPLY_FILTER_VALUES:
      newState = {
        ...state,
        jobSearchFilter: {
          ...state.jobSearchFilter,
          ...action.payload
        }
      };
      break;

    case APPLY_FILTER:
      newState = {
        ...state,
        jobSearchFilter: {
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
        resultsAreLoading: false
      };
      break;

    case OCCUPATION_LANGUAGE_CHANGED_ACTION:
      newState = {
        ...state,
        jobSearchFilter: {
          ...state.jobSearchFilter,
          occupations: action.payload.occupations,
        }
      };
      break;

    case RESET_FILTER:
      newState = {
        ...state,
        jobSearchFilter: {
          ...initialState.jobSearchFilter
        },
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
      const currentVisited = state.visitedJobAds;
      currentVisited[action.payload.jobAdvertisement.id] = true;
      newState = {
        ...state,
        selectedJobAdvertisement: action.payload.jobAdvertisement,
        visitedJobAds: { ...currentVisited }
      };
      break;

    case UPDATE_JOB_ADVERTISEMENT:
      const indexToUpdate = state.resultList.findIndex(item => item.jobAdvertisement.id === action.payload.jobSearchResultWithFavourites.jobAdvertisement.id);
      state.resultList[indexToUpdate] = action.payload.jobSearchResultWithFavourites; // todo modifying state. Bad. Must be pure function in reducers
      newState = {
        ...state,
        resultList: state.resultList
      };
      break;

    case REMOVE_JOB_AD_FROM_FAVOURITES_SUCCESS:
      const unstarredJobId = action.payload.jobSearchResultWithFavourites.jobAdvertisement.id;
      const unstarredJob: JobAdvertisementWithFavourites = state.resultList.find(result => result.jobAdvertisement.id === unstarredJobId);
      unstarredJob.favouriteItem = null; //todo modifying state. Bad. Must be pure function in reducers
      newState = {
        ...state,
        resultList: state.resultList
      };
      break;

    default:
      newState = state;
  }

  return newState;
}
