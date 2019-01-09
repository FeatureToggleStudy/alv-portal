import { initialState, ManageJobAdsState } from '../state';
import {
  Actions,
  APPLY_FILTER,
  FILTER_APPLIED,
  LOAD_NEXT_PAGE,
  NEXT_PAGE_LOADED
} from '../actions/manage-job-ads.actions';


export function manageJobAdsReducer(state = initialState, action: Actions): ManageJobAdsState {

  let newState: ManageJobAdsState;

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

    default:
      newState = state;
  }

  return newState;
}
