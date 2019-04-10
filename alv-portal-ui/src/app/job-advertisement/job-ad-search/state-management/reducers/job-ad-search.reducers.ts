import { initialState, JobAdSearchState } from '../state';
import {
  Actions,
  APPLY_FILTER,
  APPLY_FILTER_VALUES,
  APPLY_QUERY_VALUES,
  FAVOURITE_ITEM_LOADED,
  FILTER_APPLIED,
  JOB_ADVERTISEMENT_DETAIL_LOADED,
  LOAD_NEXT_PAGE,
  NEXT_PAGE_LOADED,
  OCCUPATION_LANGUAGE_CHANGED_ACTION,
  RESET,
  RESET_FILTER
} from '../actions';
import {
  ADDED_JOB_AD_FAVOURITE,
  REMOVED_JOB_AD_FAVOURITE,
  UPDATED_JOB_AD_FAVOURITE
} from '../../../../core/state-management/actions/core.actions';
import { FavouriteItem } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';

function patchFavouriteItem(state: JobAdSearchState, jobAdId: string, patchedFavouriteItem: FavouriteItem) {
  const indexToUpdate = state.resultList.findIndex(item => item.jobAdvertisement.id === jobAdId);
  if (indexToUpdate >= 0) {
    const updatedResultList = [...state.resultList];
    updatedResultList[indexToUpdate].favouriteItem = patchedFavouriteItem;
    return updatedResultList;
  } else {
    return state.resultList;
  }
}

export function jobAdSearchReducer(state = initialState, action: Actions): JobAdSearchState {

  let newState: JobAdSearchState;

  switch (action.type) {

    case RESET:
      newState = {
        ...initialState
      };
      break;

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
        resultsAreLoading: false,
        isDirtyResultList: false
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

    case ADDED_JOB_AD_FAVOURITE:
    case UPDATED_JOB_AD_FAVOURITE: {
      newState = {
        ...state,
        resultList: patchFavouriteItem(state, action.payload.favouriteItem.jobAdvertisementId, action.payload.favouriteItem),
        favouriteItem: action.payload.favouriteItem
      };
      break;
    }

    case REMOVED_JOB_AD_FAVOURITE: {
      newState = {
        ...state,
        resultList: patchFavouriteItem(state, action.payload.removedFavouriteItem.jobAdvertisementId, null),
        favouriteItem: null
      };
      break;
    }

    case FAVOURITE_ITEM_LOADED: {
      newState = {
        ...state,
        favouriteItem: action.payload.favouriteItem
      };
      break;
    }

    default:
      newState = state;
  }

  return newState;
}
