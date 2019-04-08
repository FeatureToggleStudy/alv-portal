import {initialState, JobAdSearchState} from '../state';
import {
  Actions,
  ADDED_JOB_AD_FAVOURITE,
  APPLY_FILTER,
  APPLY_FILTER_VALUES,
  APPLY_QUERY_VALUES,
  FILTER_APPLIED,
  JOB_ADVERTISEMENT_DETAIL_LOADED,
  LOAD_NEXT_PAGE,
  NEXT_PAGE_LOADED,
  OCCUPATION_LANGUAGE_CHANGED_ACTION,
  REMOVED_JOB_AD_FAVOURITE,
  RESET_FILTER
} from '../actions';

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
        visitedJobAds: {...currentVisited}
      };
      break;

    case ADDED_JOB_AD_FAVOURITE: {
      console.log('reducer: ADDED_JOB_AD_FAVOURITE is processing');
      const indexToUpdate = state.resultList.findIndex(item => item.jobAdvertisement.id === action.payload.favouriteItem.jobAdvertisementId);
      const updatedResultList = state.resultList.slice();
      updatedResultList[indexToUpdate].favouriteItem = action.payload.favouriteItem;
      newState = {
        ...state,
        resultList: updatedResultList
      };
      break;
    }

    case REMOVED_JOB_AD_FAVOURITE: {
      const indexToUpdate = state.resultList.findIndex(item => item.jobAdvertisement.id === action.payload.removedFavouriteItem.jobAdvertisementId);
      const updatedResultList = state.resultList.slice();
      const unstarredJobCopy = Object.assign({}, updatedResultList[indexToUpdate]);
      unstarredJobCopy.favouriteItem = null;
      updatedResultList[indexToUpdate] = unstarredJobCopy;
      newState = {
        ...state,
        resultList: updatedResultList
      };
      break;
    }
    default:
      newState = state;
  }

  return newState;
}
