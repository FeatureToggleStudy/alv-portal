import { CandidateSearchState, initialState } from '../state/candidate-search.state';
import { Actions } from '../actions/candidate-search.actions';

export function candidateSearchReducer(state = initialState, action: Actions): CandidateSearchState {
  let newState: CandidateSearchState;

  switch (action.type) {
    default:
      newState = state;
  }

  return newState;
}
