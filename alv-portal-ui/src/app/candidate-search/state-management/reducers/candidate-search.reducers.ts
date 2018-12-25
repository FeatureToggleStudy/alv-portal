import {
  Actions,
  APPLY_FILTER,
  APPLY_FILTER_VALUES,
  APPLY_QUERY_VALUES,
  CANDIDATE_PROFILE_DETAIL_LOADED,
  CandidateSearchState,
  FILTER_APPLIED,
  initialState,
  LOAD_NEXT_PAGE,
  NEXT_PAGE_LOADED,
  RESET_FILTER
} from '..';

export function candidateSearchReducer(state = initialState, action: Actions): CandidateSearchState {
  let newState: CandidateSearchState;

  switch (action.type) {
    case APPLY_FILTER_VALUES:
      newState = {
        ...state,
        candidateSearchFilter: {
          ...state.candidateSearchFilter,
          ...action.payload
        }
      };
      break;

    case APPLY_QUERY_VALUES:
      newState = {
        ...state,
        candidateSearchFilter: {
          ...(action.init ? initialState.candidateSearchFilter : state.candidateSearchFilter),
          ...action.payload
        }
      };
      break;

    case APPLY_FILTER:
      newState = {
        ...state,
        candidateSearchFilter: {
          ...action.payload
        },
        resultsAreLoading: true
      };
      break;

    case FILTER_APPLIED:
      newState = {
        ...state,
        resultList: [...action.payload.page],
        totalCount: action.payload.totalCount,
        page: 0,
        resultsAreLoading: false
      };
      break;

    case RESET_FILTER:
      newState = {
        ...state,
        candidateSearchFilter: {
          ...initialState.candidateSearchFilter
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

    case CANDIDATE_PROFILE_DETAIL_LOADED:
      const currentVisited = state.visitedCandidates;
      currentVisited[action.payload.candidateProfile.id] = true;
      newState = {
        ...state,
        selectedCandidateProfile: action.payload.candidateProfile,
        visitedCandidates: { ...currentVisited }
      };
      break;

    default:
      newState = state;
  }

  return newState;
}
