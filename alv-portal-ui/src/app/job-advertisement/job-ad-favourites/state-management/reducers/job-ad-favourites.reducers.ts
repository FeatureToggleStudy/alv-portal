import { initialState, JobAdFavouritesState } from '../state';
import {
  Actions,
  APPLY_FILTER,
  FAVOURITE_ITEM_LOADED,
  FILTER_APPLIED,
  JOB_ADVERTISEMENT_DETAIL_LOADED, JOB_ADVERTISEMENT_DETAIL_UNLOADED,
  LOAD_NEXT_PAGE,
  NEXT_PAGE_LOADED,
  RESET,
} from '../actions';
import {
  ADDED_JOB_AD_FAVOURITE,
  REMOVED_JOB_AD_FAVOURITE,
  UPDATED_JOB_AD_FAVOURITE
} from '../../../../core/state-management/actions/core.actions';
import {
  FavouriteItem,
  JobAdvertisementWithFavourites
} from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';


function getNextId(currentIndex: number, resultList: JobAdvertisementWithFavourites[]) {
  if (currentIndex !== undefined) {
    const ids = resultList.map((item) => item.jobAdvertisement.id);
    return currentIndex < ids.length - 1 ? ids[currentIndex + 1] : null;
  }
  return null;
}

function getPrevId(currentIndex: number, resultList: JobAdvertisementWithFavourites[]) {
  if (currentIndex !== undefined) {
    const ids = resultList.map((item) => item.jobAdvertisement.id);
    return currentIndex > 0 ? ids[currentIndex - 1] : null;
  }
  return null;
}

function removeFavouriteItem(state: JobAdFavouritesState, jobAdId: string) {
  const indexToUpdate = state.resultList.findIndex(item => item.jobAdvertisement.id === jobAdId);
  if (indexToUpdate >= 0) {
    const updatedResultList = [...state.resultList];
    updatedResultList.splice(indexToUpdate, 1);
    return updatedResultList;
  } else {
    return state.resultList;
  }
}

function patchFavouriteItem(state: JobAdFavouritesState, jobAdId: string, patchedFavouriteItem: FavouriteItem) {
  const indexToUpdate = state.resultList.findIndex(item => item.jobAdvertisement.id === jobAdId);
  if (indexToUpdate >= 0) {
    const updatedResultList = state.resultList;
    updatedResultList[indexToUpdate].favouriteItem = patchedFavouriteItem;
    return updatedResultList;
  } else {
    return state.resultList;
  }
}

export function jobAdFavouritesReducer(state = initialState, action: Actions): JobAdFavouritesState {

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
      const currentIndex = state.resultList
        .map((item) => item.jobAdvertisement.id)
        .findIndex(id => id === action.payload.jobAdvertisement.id);
      newState = {
        ...state,
        visitedJobAds: { ...currentVisited },
        lastVisitedJobAdId: action.payload.jobAdvertisement.id,
        detail: {
          ...state.detail,
          jobAdvertisement: action.payload.jobAdvertisement,
          currentIndex: currentIndex,
          nextId: getNextId(currentIndex, state.resultList),
          prevId: getPrevId(currentIndex, state.resultList),
        }
      };
      break;

    case ADDED_JOB_AD_FAVOURITE:
    case UPDATED_JOB_AD_FAVOURITE: {
      const resultList = [...patchFavouriteItem(state, action.payload.favouriteItem.jobAdvertisementId, action.payload.favouriteItem)];
      if (state.detail.jobAdvertisement) {
        // if we are on the detail page and we removed and added the same favourite again => splice it into the result list
        const currentJobAdId = state.detail.jobAdvertisement.id;
        const addedFavJobAdId = action.payload.favouriteItem.jobAdvertisementId;
        const isNotInResultList = state.resultList.findIndex(item => item.jobAdvertisement.id === addedFavJobAdId) === -1;
        if (isNotInResultList && currentJobAdId === addedFavJobAdId) {
          resultList.splice(state.detail.currentIndex, 0, {
            favouriteItem: action.payload.favouriteItem,
            jobAdvertisement: state.detail.jobAdvertisement
          });
        }
      }

      newState = {
        ...state,
        resultList: resultList,
        detail: {
          ...state.detail,
          favouriteItem: action.payload.favouriteItem,
        }
      };
      break;
    }

    case REMOVED_JOB_AD_FAVOURITE: {
      newState = {
        ...state,
        resultList: removeFavouriteItem(state, action.payload.removedFavouriteItem.jobAdvertisementId),
        totalCount: state.totalCount - 1,
        detail: {
          ...state.detail,
          favouriteItem: null,
        }
      };
      break;
    }

    case JOB_ADVERTISEMENT_DETAIL_UNLOADED: {
      newState = {
        ...state,
        detail: {
          ...initialState.detail
        }
      };
      break;
    }

    case FAVOURITE_ITEM_LOADED: {
      newState = {
        ...state,
        detail: {
          ...state.detail,
          favouriteItem: action.payload.favouriteItem,
        }
      };
      break;
    }

    default:
      newState = state;
  }

  return newState;
}
