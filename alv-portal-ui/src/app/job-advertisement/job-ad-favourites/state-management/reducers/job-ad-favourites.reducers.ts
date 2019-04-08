import {initialState, JobAdFavouritesState} from '../state';
import {
  Actions,
  APPLY_FILTER,
  FILTER_APPLIED,
  JOB_ADVERTISEMENT_DETAIL_LOADED,
  LOAD_NEXT_PAGE,
  NEXT_PAGE_LOADED,
  UPDATE_JOB_ADVERTISEMENT
} from '../actions';

export function jobAdFavouritesReducer(state = initialState, action: Actions): JobAdFavouritesState {

  let newState: JobAdFavouritesState;

  switch (action.type) {

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
        resultsAreLoading: false
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

    // TODO what is this for?
    case UPDATE_JOB_ADVERTISEMENT:
      const indexToUpdate = state.resultList.findIndex(item => item.jobAdvertisement.id === action.payload.jobAdvertisementWithFavourites.jobAdvertisement.id);
      state.resultList[indexToUpdate] = action.payload.jobAdvertisementWithFavourites;
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
