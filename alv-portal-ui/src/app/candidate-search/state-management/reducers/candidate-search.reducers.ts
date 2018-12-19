import { Actions, CandidateSearchState, FILTER_APPLIED, initialState } from '..';

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

    default:
      newState = state;
  }

  return newState;
}
