import { initialState, JobAdSearchState } from '../state/job-ad-search.state';
import {
  Actions, CURRENT_LOADED, FILTER_CHANGED,
  INIT_JOB_SEARCH,
  JOB_LIST_LOADED, NEXT_PAGE_LOADED
} from '../actions/job-ad-search.actions';

export function jobAdSearchReducer(state = initialState, action: Actions): JobAdSearchState {
  console.log(`action: ${action.type}`);

  let newState;
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
    case FILTER_CHANGED:
      newState = {
        ...state,
        jobSearchFilter: {
          ...action.payload
        }
      };
      break;
    case JOB_LIST_LOADED:
      newState = {
        ...state,
        resultList: [...action.payload.jobList],
        totalCount: action.payload.totalCount,
        page: 0
      };
      break;

    case NEXT_PAGE_LOADED:
      newState = {
        ...state,
        resultList: [...state.resultList, ...action.payload],
        page: state.page + 1
      };
      break;
    case CURRENT_LOADED:
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
