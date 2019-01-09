import { initialState, ManageJobAdsState } from '../state';
import { Actions } from '../actions/manage-job-ads.actions';

export function manageJobAdsReducer(state = initialState, action: Actions): ManageJobAdsState {

  let newState: ManageJobAdsState;

    switch (action.type) {

      default:
        newState = state;
    }

  return newState;
}
