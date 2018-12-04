import { initialState, JobAdSearchState } from '../state/job-ad-search.state';
import {
  Actions, JOB_ADVERTISEMENT_DETAIL_LOADED, APPLY_FILTER,
  INIT_JOB_SEARCH,
  FILTER_APPLIED, LOAD_NEXT_PAGE, NEXT_PAGE_LOADED
} from '../actions/job-ad-search.actions';

export function jobAdSearchReducer(state = initialState, action: Actions): JobAdSearchState {
  console.log(`action: ${action.type}`);

  let newState:JobAdSearchState;
  switch (action.type) {
    /*case INIT_JOB_SEARCH:
      newState = {
        ...state,
        jobSearchFilter: {
          ...state.jobSearchFilter,
          onlineSince: action.payload.onlineSince
        }
      };
      break;*/
    case APPLY_FILTER:
      newState = {
        ...state,
        jobSearchFilter: {
          ...action.payload
        },
        resultsAreLoading: true
      };
      break;
    case FILTER_APPLIED:
      newState = {
        ...state,
        resultList: [...action.payload.jobList],
        totalCount: action.payload.totalCount,
        page: 0,
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
        resultList: [...state.resultList, ...action.payload],
        page: state.page + 1,
        resultsAreLoading: false
      };
      break;
    case JOB_ADVERTISEMENT_DETAIL_LOADED:
      newState = {
        ...state,
        currentJobAd: action.payload.jobAdvertisement
      };
      break;

    default:
      newState = state;
  }

  return newState;
}
