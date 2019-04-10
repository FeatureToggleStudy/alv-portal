import * as candidateActions from '../actions/candidate-search.actions';
import { CandidateSearchFilter, CandidateSearchState, initialState } from '../state';
import { candidateSearchReducer } from './candidate-search.reducers';
import { FilterPanelValues } from '../../candidate-search/filter-panel/filter-panel.component';
import {
  Availability,
  CEFR_Level,
  Degree,
  DrivingLicenceCategory,
  Experience,
  Graduation
} from '../../../shared/backend-services/shared.types';
import { CandidateQueryPanelValues } from '../../../widgets/candidate-search-widget/candidate-query-panel/candidate-query-panel-values';
import { OccupationCode } from '../../../shared/backend-services/reference-service/occupation-label.types';
import {
  OccupationTypeaheadItem,
  OccupationTypeaheadItemType
} from '../../../shared/occupations/occupation-typeahead-item';
import { StringTypeaheadItem } from '../../../shared/forms/input/typeahead/string-typeahead-item';
import {
  LocalityInputType,
  LocalityItem,
  LocalityTypeaheadItem
} from '../../../shared/localities/locality-typeahead-item';
import { CandidateProfile } from '../../../shared/backend-services/candidate/candidate.types';
import { createCandidateProfile } from './candidate-search.reducers.spec-util';

const COMMUNAL_CODE_ZURICH = 261;

describe('candidateSearchReducer', () => {

  /* FILTER PANEL VALUES CHANGED */
  const filterPanelValues: FilterPanelValues = {
    experience: Experience.MORE_THAN_1_YEAR,
    residence: [],
    availability: Availability.IMMEDIATE,
    workloadPercentageMin: 50,
    workloadPercentageMax: 100,
    workForm: null,
    degree: Degree.TER_BERUFSBILDUNG_DIPL,
    graduation: Graduation.NOT_ACCEPTED,
    drivingLicenceCategory: DrivingLicenceCategory.B,
    languageSkills: [{ code: 'de', spoken: CEFR_Level.BASIC, written: CEFR_Level.BASIC }]
  };

  /* QUERY PANEL VALUES CHANGED */
  const occupationCode: OccupationCode = {
    type: 'AVAM',
    value: '68913',
    mapping: { type: 'BFS', value: '33302009' }
  };
  const localityItem: LocalityItem = {
    regionCode: 'ZH12',
    cantonCode: 'ZH',
    communalCode: COMMUNAL_CODE_ZURICH
  };
  const occupation = new OccupationTypeaheadItem(
    OccupationTypeaheadItemType.OCCUPATION, occupationCode, 'Java-Programmierer/in', 0);
  const keyword = new StringTypeaheadItem('free-text', 'datenbank', 'datenbank', 0);
  const queryPanelValues: CandidateQueryPanelValues = {
    occupations: [occupation],
    keywords: [keyword],
    workplace: new LocalityTypeaheadItem(LocalityInputType.LOCALITY, localityItem, 'Zürich', 0)
  };

  /* CANDIDATE PROFILE ARRAY */
  const candidateProfilePageOne: CandidateProfile[] = [
    createCandidateProfile('cand01'),
    createCandidateProfile('cand02'),
    createCandidateProfile('cand03'),
    createCandidateProfile('cand04'),
    createCandidateProfile('cand05')
  ];

  /* CANDIDATE PROFILE STATE CHANGED */
  const candidateStateChanged: CandidateSearchState = {
    ...initialState,
    totalCount: 100,
    page: 1,
    resultList: candidateProfilePageOne,
    candidateSearchFilter: {
      ...filterPanelValues,
      ...queryPanelValues
    }
  };

  /*--------------------START--------------------*/

  it('DEFAULT : should not change state for undefined action', () => {
    // GIVEN
    const action = {} as candidateActions.Actions;

    // WHEN
    const newState = candidateSearchReducer(initialState, action);

    // THEN
    expect(newState).toEqual(initialState);
  });

  it('APPLY_QUERY_VALUES : with init = false, should update state with new CandidateQueryPanelValues', () => {
    // GIVEN
    const action = new candidateActions.ApplyQueryValuesAction(queryPanelValues);

    // WHEN
    const newState = candidateSearchReducer(initialState, action);

    // THEN
    expect(newState.candidateSearchFilter.occupations).toEqual(queryPanelValues.occupations);
    expect(newState.candidateSearchFilter.keywords).toEqual(queryPanelValues.keywords);
    expect(newState.candidateSearchFilter.workplace).toEqual(queryPanelValues.workplace);
    verifyUnchanged(newState, initialState, ['candidateSearchFilter']);
    verifyUnchanged(newState.candidateSearchFilter, initialState.candidateSearchFilter, ['occupations', 'keywords', 'workplace']);
  });

  it('APPLY_QUERY_VALUES : with init = true, should update state with new queryPanelValues and return to initial filterPanelValues', () => {
    // GIVEN
    const state: CandidateSearchState = {
      ...initialState,
      candidateSearchFilter: {
        ...initialState.candidateSearchFilter,
        experience: Experience.MORE_THAN_3_YEARS,
        availability: Availability.IMMEDIATE
      }
    };

    const action = new candidateActions.ApplyQueryValuesAction(queryPanelValues, true);

    // WHEN
    const newState = candidateSearchReducer(state, action);

    // THEN
    expect(newState.candidateSearchFilter.occupations).toEqual(queryPanelValues.occupations);
    expect(newState.candidateSearchFilter.keywords).toEqual(queryPanelValues.keywords);
    expect(newState.candidateSearchFilter.workplace).toEqual(queryPanelValues.workplace);
    expect(newState.candidateSearchFilter.experience).toEqual(initialState.candidateSearchFilter.experience);
    expect(newState.candidateSearchFilter.availability).toEqual(initialState.candidateSearchFilter.availability);
    verifyUnchanged(newState, initialState, ['candidateSearchFilter']);
    verifyUnchanged(newState.candidateSearchFilter, initialState.candidateSearchFilter, ['occupations', 'keywords', 'workplace']);
  });

  it('APPLY_FILTER_VALUES : should update state with new FilterPanelValues', () => {
    // GIVEN
    const payload: CandidateSearchFilter = {
      ...filterPanelValues,
      occupations: [],
      keywords: [],
      workplace: null
    };

    const action = new candidateActions.ApplyFilterValuesAction(payload);

    // WHEN
    const newState = candidateSearchReducer(initialState, action);

    // THEN
    expect(newState.candidateSearchFilter).toEqual(payload);
    verifyUnchanged(newState, initialState, ['candidateSearchFilter']);
  });

  it('APPLY_FILTER : should update candidateSearchFilter', () => {
    // GIVEN
    const payload: CandidateSearchFilter = {
      ...filterPanelValues,
      ...queryPanelValues
    };

    const action = new candidateActions.ApplyFilterAction(payload);

    // WHEN
    const newState = candidateSearchReducer(initialState, action);

    // THEN
    expect(newState.candidateSearchFilter).toEqual(payload);
    expect(newState.page).toBeNumber();
    expect(newState.page).toEqual(0);
    expect(newState.resultsAreLoading).toBeTruthy();
  });

  it('FILTER APPLIED : it should update resultList and totalCount', () => {
    // GIVEN
    const action = new candidateActions.FilterAppliedAction({
      page: candidateProfilePageOne,
      totalCount: 100
    });

    // WHEN
    const newState = candidateSearchReducer(initialState, action);

    // THEN
    expect(newState.resultList).toBeNonEmptyArray();
    expect(newState.resultList).toBeArrayOfSize(candidateProfilePageOne.length);
    expect(newState.resultList).toEqual(candidateProfilePageOne);
    expect(newState.totalCount).toEqual(100);
    expect(newState.resultsAreLoading).toBeFalsy();
    verifyUnchanged(newState, initialState, ['resultList', 'totalCount', 'resultsAreLoading', 'isDirtyResultList']);
  });

  it('OCCUPATION_LANGUAGE_CHANGED_ACTION : should update occupation CATEGORY for language and value', () => {
    // GIVEN
    const occupCode: OccupationCode = { type: 'SBN5', value: '36102' };
    const classificationDE = new OccupationTypeaheadItem(
      OccupationTypeaheadItemType.CLASSIFICATION, occupCode, 'Programmierer/innen', 2);
    const classificationEN = new OccupationTypeaheadItem(
      OccupationTypeaheadItemType.CLASSIFICATION, occupCode, 'Programmers', 2);
    const changedState: CandidateSearchState = {
      ...initialState,
      candidateSearchFilter: {
        ...initialState.candidateSearchFilter,
        occupations: [classificationEN]
      }
    };
    const action = new candidateActions.OccupationLanguageChangedAction({ occupations: [classificationDE] });

    // WHEN
    const newState = candidateSearchReducer(changedState, action);

    // THEN
    expect(newState.candidateSearchFilter.occupations).toBeNonEmptyArray();
    expect(newState.candidateSearchFilter.occupations).toEqual([classificationDE]);
    verifyUnchanged(newState, changedState, ['candidateSearchFilter']);
    verifyUnchanged(newState.candidateSearchFilter, changedState.candidateSearchFilter, ['occupations']);
  });

  it('RESET_FILTER : should update filter and query values to initial state', () => {
    // GIVEN
    const action = new candidateActions.ResetFilterAction({});

    // WHEN
    const newState = candidateSearchReducer(candidateStateChanged, action);

    // THEN
    expect(newState.candidateSearchFilter).toEqual(initialState.candidateSearchFilter);
    verifyUnchanged(newState, candidateStateChanged, ['candidateSearchFilter']);
  });

  it('LOAD_NEXT_PAGE : should only flag tre that results are loading', () => {
    // GIVEN
    const action = new candidateActions.LoadNextPageAction();

    // WHEN
    const newState = candidateSearchReducer(initialState, action);

    // THEN
    expect(newState.resultsAreLoading).toBeTruthy();
    verifyUnchanged(newState, initialState, ['resultsAreLoading']);
  });

  it('NEXT_PAGE_LOADED : should update resultList, page number and resultAreLoading', () => {
    // GIVEN
    const candidateProfilePageTwo: CandidateProfile[] = [
      createCandidateProfile('cand06'),
      createCandidateProfile('cand07'),
      createCandidateProfile('cand08'),
      createCandidateProfile('cand09'),
      createCandidateProfile('cand10')
    ];

    const action = new candidateActions.NextPageLoadedAction({ page: candidateProfilePageTwo });

    // WHEN
    const newState = candidateSearchReducer(candidateStateChanged, action);

    // THEN
    expect(newState.page).toEqual(candidateStateChanged.page + 1);
    expect(newState.resultsAreLoading).toBeFalsy();
    expect(newState.resultList).toBeNonEmptyArray();
    expect(newState.resultList).toBeArrayOfSize(candidateStateChanged.resultList.length + candidateProfilePageTwo.length);
    verifyUnchanged(newState, candidateStateChanged, ['page', 'resultsAreLoading', 'resultList']);
  });

  it('CANDIDATE_PROFILE_DETAIL_LOADED : should update selectedCandidateProfile and visitedCandidates', () => {
    // GIVEN
    const selectedCandidateProfileOne = candidateProfilePageOne[0];
    const visitedCandidatesOne = { [selectedCandidateProfileOne.id]: true };

    let action = new candidateActions.CandidateProfileDetailLoadedAction({ candidateProfile: selectedCandidateProfileOne });

    // WHEN
    const newStateOne = candidateSearchReducer(candidateStateChanged, action);

    // THEN
    expect(newStateOne.selectedCandidateProfile).toEqual(selectedCandidateProfileOne);
    expect(newStateOne.visitedCandidates).toEqual(visitedCandidatesOne);
    verifyUnchanged(newStateOne, candidateStateChanged, ['selectedCandidateProfile', 'visitedCandidates']);

    // GIVEN
    const selectedCandidateProfileTwo = candidateProfilePageOne[1];
    const visitedCandidatesTwo = {
      [selectedCandidateProfileOne.id]: true,
      [selectedCandidateProfileTwo.id]: true
    };

    action = new candidateActions.CandidateProfileDetailLoadedAction({ candidateProfile: selectedCandidateProfileTwo });

    // WHEN
    const newStateTwo = candidateSearchReducer(newStateOne, action);

    // THEN
    expect(newStateTwo.selectedCandidateProfile).toEqual(selectedCandidateProfileTwo);
    expect(newStateTwo.visitedCandidates).toEqual(visitedCandidatesTwo);
    verifyUnchanged(newStateTwo, newStateOne, ['selectedCandidateProfile', 'visitedCandidates']);
  });

  /*----------------------END----------------------*/

});

// check if key elements of an object are unchanged
function verifyUnchanged(afterAction: Object, beforeAction: Object, ignoreFields: Array<string>) {
  Object.keys(afterAction)
    .filter((key: string) => ignoreFields.indexOf(key) < 0)
    .forEach((key: string) => {
      expect(afterAction[key]).toEqual(beforeAction[key]);
    });
}
