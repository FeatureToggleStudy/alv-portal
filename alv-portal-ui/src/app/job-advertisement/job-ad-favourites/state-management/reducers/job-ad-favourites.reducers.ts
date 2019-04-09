import { initialState, JobAdFavouritesState } from '../state';
import {
  Actions,
  APPLY_FILTER,
  FAVOURITE_ITEM_LOADED,
  FILTER_APPLIED,
  JOB_ADVERTISEMENT_DETAIL_LOADED,
  LOAD_NEXT_PAGE,
  NEXT_PAGE_LOADED,
  RESET,
} from '../actions';
import {
  ADDED_JOB_AD_FAVOURITE,
  REMOVED_JOB_AD_FAVOURITE,
  UPDATED_JOB_AD_FAVOURITE
} from '../../../../core/state-management/actions/core.actions';


export function jobAdFavouritesReducer(state = initialState, action: Actions): JobAdFavouritesState {

  function findJobAdIdIndex(jobAdId: string) {
    return state.resultList.findIndex(item => item.jobAdvertisement.id === jobAdId);
  }

  let newState: JobAdFavouritesState;

  switch (action.type) {

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
      const currentVisited = state.visitedJobAds;
      currentVisited[action.payload.jobAdvertisement.id] = true;
      newState = {
        ...state,
        selectedJobAdvertisement: action.payload.jobAdvertisement,
        visitedJobAds: {...currentVisited}
      };
      break;

    case ADDED_JOB_AD_FAVOURITE:
    case UPDATED_JOB_AD_FAVOURITE: {
      const updatedResultList = state.resultList.slice();
      const indexToUpdate = findJobAdIdIndex(action.payload.favouriteItem.jobAdvertisementId);
      if (indexToUpdate >= 0) {
        updatedResultList[indexToUpdate].favouriteItem = action.payload.favouriteItem;
      }
      newState = {
        ...state,
        resultList: updatedResultList,
        favouriteItem: action.payload.favouriteItem
      };
      break;
    }

    case REMOVED_JOB_AD_FAVOURITE: {
      const updatedResultList = state.resultList.slice();
      const indexToUpdate = findJobAdIdIndex(action.payload.removedFavouriteItem.jobAdvertisementId);
      if (indexToUpdate >= 0) {
        updatedResultList.splice(indexToUpdate, 1);
      }
      newState = {
        ...state,
        resultList: updatedResultList,
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
