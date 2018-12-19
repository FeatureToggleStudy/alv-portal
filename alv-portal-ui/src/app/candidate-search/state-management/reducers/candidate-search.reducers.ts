import {
  Actions,
  CandidateSearchState,
  FILTER_APPLIED,
  initialState,
  LOAD_NEXT_PAGE,
  NEXT_PAGE_LOADED
} from '..';

export function candidateSearchReducer(state = initialState, action: Actions): CandidateSearchState {
  let newState: CandidateSearchState;
  // todo: implement

  switch (action.type) {
    case FILTER_APPLIED:
      newState = {
        ...state,
        resultList: [...action.payload.page],
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
