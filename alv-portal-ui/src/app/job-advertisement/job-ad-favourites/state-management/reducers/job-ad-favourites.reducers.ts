import {initialState, JobAdFavouritesState} from '../state';
import {
  Actions,
  APPLY_FILTER,
  FILTER_APPLIED,
  JOB_ADVERTISEMENT_DETAIL_LOADED,
  LOAD_NEXT_PAGE,
  NEXT_PAGE_LOADED,
  RESET,
} from '../actions';
import {REMOVED_JOB_AD_FAVOURITE} from '../../../../core/state-management/actions/core.actions';

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

    case REMOVED_JOB_AD_FAVOURITE: {
      const indexToUpdate = findJobAdIdIndex(action.payload.removedFavouriteItem.jobAdvertisementId);
      if (indexToUpdate === -1) {
        return state;
      }
      // TODO we need a better approach
      const resultList = state.resultList.slice();
      resultList.splice(indexToUpdate, 1);
      newState = {
        ...state,
        resultList: resultList
      };
      break;
    }

    default:
      newState = state;
  }

  return newState;
}
