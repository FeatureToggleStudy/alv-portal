import {
  ContractType,
  initialState,
  JobAdSearchState,
  JobSearchFilter,
  Sort
} from '../state';
import * as jobActions from '../actions/job-ad-search.actions';
import { jobAdSearchReducer } from './job-ad-search.reducers';
import { JobQueryPanelValues } from '../../../../widgets/job-search-widget/job-query-panel/job-query-panel-values';
import { FilterPanelValues } from '../../job-search/filter-panel/filter-panel.component';
import { createJobAdvertisement } from './job-ad-search.reducers.spec-util';
import { JobAdvertisement } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import {
  OccupationMultiTypeaheadItem,
  OccupationMultiTypeaheadItemType
} from '../../../../shared/occupations/occupation-multi-typeahead-item';
import { SimpleMultiTypeaheadItem } from '../../../../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';
import { OccupationCode } from '../../../../shared/backend-services/reference-service/occupation-label.types';
import {
  LocalityInputType,
  LocalityItem,
  LocalityMultiTypeaheadItem
} from '../../../../shared/localities/locality-multi-typeahead-item';

describe('jobAdSearchReducers', () => {

  /* QUERY PANEL VALUES CHANGED */
  const occupationCode: OccupationCode = { type: 'X28', value: '11000976' };
  const localityItem: LocalityItem = { communalCode: '351' };
  const occupation = new OccupationMultiTypeaheadItem(
    OccupationMultiTypeaheadItemType.OCCUPATION, occupationCode, 'Java Applikationsentwickler', 7);
  const keyword = new SimpleMultiTypeaheadItem('free-text', 'angular', 'angular', 0);
  const locality = new LocalityMultiTypeaheadItem(LocalityInputType.LOCALITY, localityItem, 'Bern', 0);
  const queryPanelValues: JobQueryPanelValues = {
    occupations: [occupation],
    keywords: [keyword],
    localities: [locality]
  };

  /* FILTER PANEL VALUES CHANGED */
  const filterPanelValues: FilterPanelValues = {
    sort: Sort.DATE_ASC,
    displayRestricted: false,
    contractType: ContractType.TEMPORARY,
    workloadPercentageMin: 50,
    workloadPercentageMax: 90,
    company: null,
    onlineSince: 11
  };

  /* JOB ADVERTISEMENT ARRAY */
  const jobAdPageOne: JobAdvertisement[] = [
    createJobAdvertisement('01'),
    createJobAdvertisement('02'),
    createJobAdvertisement('03'),
    createJobAdvertisement('04'),
    createJobAdvertisement('05')
  ];

  /* JOB AD SEARCH STATE */
  const jobAdStateChanged: JobAdSearchState = {
    ...initialState,
    totalCount: 50,
    page: 1,
    resultList: jobAdPageOne,
    jobSearchFilter: {
      ...filterPanelValues,
      ...queryPanelValues
    }
  };

  /*--------------------START--------------------*/

  it('DEFAULT : should not change state for undefined action', () => {
    // GIVEN
    const action = {} as jobActions.Actions;

    // WHEN
    const newState = jobAdSearchReducer(initialState, action);

    // THEN
    expect(newState).toEqual(initialState);
  });

  it('APPLY_QUERY_VALUES : with init = false, should update state with new JobQueryPanelValues', () => {
    // GIVEN
    const action = new jobActions.ApplyQueryValuesAction(queryPanelValues);

    // WHEN
    const newState = jobAdSearchReducer(initialState, action);

    // THEN
    expect(newState.jobSearchFilter.occupations).toEqual(queryPanelValues.occupations);
    expect(newState.jobSearchFilter.keywords).toEqual(queryPanelValues.keywords);
    expect(newState.jobSearchFilter.localities).toEqual(queryPanelValues.localities);

    verifyUnchanged(newState, initialState, ['jobSearchFilter']);
    verifyUnchanged(newState.jobSearchFilter, initialState.jobSearchFilter, ['occupations', 'keywords', 'localities']);
  });

  it('APPLY_QUERY_VALUES : with init = true, should update state with JobQueryPanelValues and return to initial jobSearchFilter values', () => {
    // GIVEN
    const state: JobAdSearchState = {
      ...initialState,
      jobSearchFilter: {
        ...initialState.jobSearchFilter,
        sort: Sort.DATE_ASC,
        contractType: ContractType.TEMPORARY
      }
    };

    const action = new jobActions.ApplyQueryValuesAction(queryPanelValues, true);

    // WHEN
    const newState = jobAdSearchReducer(state, action);

    // THEN
    expect(newState.jobSearchFilter.occupations).toEqual(queryPanelValues.occupations);
    expect(newState.jobSearchFilter.keywords).toEqual(queryPanelValues.keywords);
    expect(newState.jobSearchFilter.localities).toEqual(queryPanelValues.localities);

    expect(newState.jobSearchFilter.sort).toEqual(initialState.jobSearchFilter.sort);
    expect(newState.jobSearchFilter.contractType).toEqual(initialState.jobSearchFilter.contractType);

    verifyUnchanged(newState, initialState, ['jobSearchFilter']);
    verifyUnchanged(newState.jobSearchFilter, initialState.jobSearchFilter, ['occupations', 'keywords', 'localities']);
  });

  it('APPLY_FILTER_VALUES : should update state with new FilterPanelValues', () => {
    // GIVEN
    const jobSearchFilterChanged: JobSearchFilter = {
      ...filterPanelValues,
      occupations: [],
      keywords: [],
      localities: []
    };

    const action = new jobActions.ApplyFilterValuesAction(filterPanelValues);

    // WHEN
    const newState = jobAdSearchReducer(initialState, action);

    // THEN
    expect(newState.jobSearchFilter).toEqual(jobSearchFilterChanged);

    verifyUnchanged(newState, initialState, ['jobSearchFilter']);
  });

  it('APPLY_FILTER : should update jobSearchFilter, page and resultAreLoading', () => {
    // GIVEN
    const payload: JobSearchFilter = {
      ...filterPanelValues,
      ...queryPanelValues
    };

    const action = new jobActions.ApplyFilterAction(payload);

    // WHEN
    const newState = jobAdSearchReducer(initialState, action);

    // THEN
    expect(newState.jobSearchFilter).toEqual(payload);
    expect(newState.page).toBeNumber();
    expect(newState.page).toEqual(0);
    expect(newState.resultsAreLoading).toBeTruthy();
  });

  it('FILTER_APPLIED : it should update Array of JobAdvertisement and totalCount', () => {
    // GIVEN
    const action = new jobActions.FilterAppliedAction({
      page: jobAdPageOne,
      totalCount: 50
    });

    // WHEN
    const newState = jobAdSearchReducer(initialState, action);

    // THEN
    expect(newState.resultList).toBeNonEmptyArray();
    expect(newState.resultList).toBeArrayOfSize(jobAdPageOne.length);
    expect(newState.resultList).toEqual(jobAdPageOne);
    expect(newState.totalCount).toEqual(50);
    expect(newState.resultsAreLoading).toBeFalsy();

    verifyUnchanged(newState, initialState, ['resultList', 'totalCount', 'resultsAreLoading']);
  });

  it('OCCUPATION_LANGUAGE_CHANGED_ACTION : should update occupation category for language and value', () => {
    // GIVEN
    const occupCode: OccupationCode = { type: 'SBN3', value: '361' };
    const classificationDE = new OccupationMultiTypeaheadItem(
      OccupationMultiTypeaheadItemType.CLASSIFICATION, occupCode, 'Berufe der Informatik', 10);
    const classificationEN = new OccupationMultiTypeaheadItem(
      OccupationMultiTypeaheadItemType.CLASSIFICATION, occupCode, 'IT occupations', 10);
    const state: JobAdSearchState = {
      ...initialState,
      jobSearchFilter: {
        ...initialState.jobSearchFilter,
        occupations: [classificationDE]
      }
    };

    const action = new jobActions.OccupationLanguageChangedAction({ occupations: [classificationEN] });

    // WHEN
    const newState = jobAdSearchReducer(state, action);

    // THEN
    expect(newState.jobSearchFilter.occupations).toBeNonEmptyArray();
    expect(newState.jobSearchFilter.occupations).toEqual([classificationEN]);

    verifyUnchanged(newState, state, ['jobSearchFilter']);
    verifyUnchanged(newState.jobSearchFilter, state.jobSearchFilter, ['occupations']);
  });

  it('RESET_FILTER : should update filter and query values to their initial state', () => {
    // GIVEN
    const action = new jobActions.ResetFilterAction({});

    // WHAT
    const newState = jobAdSearchReducer(jobAdStateChanged, action);

    // THEN
    expect(newState.jobSearchFilter).toEqual(initialState.jobSearchFilter);

    verifyUnchanged(newState, jobAdStateChanged, ['jobSearchFilter']);
  });

  it('LOAD_NEXT_PAGE : should only flag true that results are loading', () => {
    // GIVEN
    const action = new jobActions.LoadNextPageAction();

    // WHEN
    const newState = jobAdSearchReducer(initialState, action);

    //THEN
    expect(newState.resultsAreLoading).toBeTruthy();

    verifyUnchanged(newState, initialState, ['resultsAreLoading']);
  });

  it('NEXT_PAGE_LOADED : should update resultList, page and results are loading flagged false', () => {
    // GIVEN
    const jobAdPageTwo: JobAdvertisement[] = [
      createJobAdvertisement('06'),
      createJobAdvertisement('07'),
      createJobAdvertisement('08'),
      createJobAdvertisement('09'),
      createJobAdvertisement('10')
    ];

    const action = new jobActions.NextPageLoadedAction({ page: jobAdPageTwo });

    // WHEN
    const newState = jobAdSearchReducer(jobAdStateChanged, action);

    // THEN
    expect(newState.page).toEqual(jobAdStateChanged.page + 1);
    expect(newState.resultsAreLoading).toBeFalsy();
    expect(newState.resultList).toBeNonEmptyArray();
    expect(newState.resultList).toBeArrayOfSize(jobAdStateChanged.resultList.length + jobAdPageTwo.length);

    verifyUnchanged(newState, jobAdStateChanged, ['page', 'resultsAreLoading', 'resultList']);
  });

  it('JOB_ADVERTISEMENT_DETAIL_LOADED : should update selectedJobAdvertisement and visitedJobAds', () => {
    // GIVEN
    const selectedJobAdOne = jobAdPageOne[0];
    const visitedJobAdOne = { [selectedJobAdOne.id]: true };

    let action = new jobActions.JobAdvertisementDetailLoadedAction({ jobAdvertisement: selectedJobAdOne });

    // WHEN
    const newStateOne = jobAdSearchReducer(jobAdStateChanged, action);

    // THEN
    expect(newStateOne.selectedJobAdvertisement).toEqual(selectedJobAdOne);
    expect(newStateOne.visitedJobAds).toEqual(visitedJobAdOne);

    verifyUnchanged(newStateOne, jobAdStateChanged, ['selectedJobAdvertisement', 'visitedJobAds']);

    // GIVEN
    const selectedJobAdTwo = jobAdPageOne[4];
    const visitedJobAdTwo = { [selectedJobAdOne.id]: true, [selectedJobAdTwo.id]: true };

    action = new jobActions.JobAdvertisementDetailLoadedAction({ jobAdvertisement: selectedJobAdTwo });

    // WHEN
    const newStateTwo = jobAdSearchReducer(newStateOne, action);

    // THEN
    expect(newStateTwo.selectedJobAdvertisement).toEqual(selectedJobAdTwo);
    expect(newStateTwo.visitedJobAds).toEqual(visitedJobAdTwo);

    verifyUnchanged(newStateTwo, newStateOne, ['selectedJobAdvertisement', 'visitedJobAds']);
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
