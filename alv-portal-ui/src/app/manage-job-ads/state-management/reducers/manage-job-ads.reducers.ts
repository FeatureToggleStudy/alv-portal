import { initialState, ManageJobAdsState } from '../state';
import { Actions, APPLY_FILTER, FILTER_APPLIED } from '../actions/manage-job-ads.actions';

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

    default:
      newState = state;
  }

  return newState;
}
