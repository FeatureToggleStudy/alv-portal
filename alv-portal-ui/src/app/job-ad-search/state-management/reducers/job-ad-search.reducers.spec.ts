import { initialState, JobAdSearchState } from '../state/job-ad-search.state';
import * as actions from '../actions/job-ad-search.actions';
import {
    ApplyFilterAction,
    ApplyFilterValuesAction,
    ApplyQueryValuesAction,
    FilterAppliedAction,
    JobAdvertisementDetailLoadedAction,
    LoadNextPageAction,
    NextPageLoadedAction,
    OccupationLanguageChangedAction,
    ResetFilterAction
} from '../actions/job-ad-search.actions';
import { jobAdSearchReducer } from './job-ad-search.reducers';
import { JobQueryPanelValues } from '../../../widgets/job-search-widget/job-query-panel/job-query-panel-values';
import { ContractType, JobSearchFilter, Sort } from '../state/job-search-filter.types';
import { FilterPanelValues } from '../../job-search/filter-panel/filter-panel.component';
import { createJobAdvertisement } from './job-ad-search.reducers.spec-util';
import {
    JobAdvertisement,
    ProfessionCode
} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import {
    OccupationMultiTypeaheadItem,
    OccupationMultiTypeaheadItemType
} from '../../../shared/occupations/occupation-multi-typeahead-item';
import { SimpleMultiTypeaheadItem } from '../../../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';

describe('jobAdSearchReducers', () => {

    /* QUERY PANEL VALUES CHANGED */
    const professionCode: ProfessionCode[] = [{ type: 'X28', value: '11000976' }, { type: 'AVAM', value: '68913' }];
    const occupation = new OccupationMultiTypeaheadItem(
        OccupationMultiTypeaheadItemType.OCCUPATION, professionCode, 'Java Applikationsentwickler', 7);
    const keyword = new SimpleMultiTypeaheadItem('free-text', 'angular', 'angular', 0);
    const locality = new SimpleMultiTypeaheadItem('locality', '351', 'Bern', 0);
    const queryPanelValues: JobQueryPanelValues = {
        occupations: [ occupation ],
        keywords: [ keyword ],
        localities: [ locality ]
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

    /*
     * DEFAULT
     * it should not change state for undefined action
     */
    it('DEFAULT : should not change state for undefined action', () => {
        // GIVEN
        const action = {} as actions.Actions;

        // WHEN
        const newState = jobAdSearchReducer(initialState, action);

        // THEN
        expect(newState).toEqual(initialState);
    });

    /*
     * APPLY_QUERY_VALUES with init = false
     * it should update state with new JobQueryPanelValues
     */
    it('APPLY_QUERY_VALUES : should update state with new JobQueryPanelValues', () => {
       // GIVEN
       const payload: JobQueryPanelValues = queryPanelValues;

       const action = new ApplyQueryValuesAction(payload);

       // WHEN
       const newState = jobAdSearchReducer(initialState, action);

       // THEN
       expect(newState.jobSearchFilter.occupations).toEqual(payload.occupations);
       expect(newState.jobSearchFilter.keywords).toEqual(payload.keywords);
       expect(newState.jobSearchFilter.localities).toEqual(payload.localities);

       verifyUnchanged(newState, initialState, ['jobSearchFilter']);
       verifyUnchanged(newState.jobSearchFilter, initialState.jobSearchFilter, ['occupations', 'keywords', 'localities']);
    });

    /*
     * APPLY_QUERY_VALUES with init = true
     * it should update state with new JobQueryPanelValues and return to initial jobSearchFilter values
     */
    it('APPLY_QUERY_VALUES : should update state with JobQueryPanelValues', () => {
        // GIVEN
        const payload: JobQueryPanelValues = queryPanelValues;
        const state: JobAdSearchState = {
            ...initialState,
            jobSearchFilter: {
                ...initialState.jobSearchFilter,
                sort: Sort.DATE_ASC,
                contractType: ContractType.TEMPORARY
            }
        };

        const action = new ApplyQueryValuesAction(payload, true);

        // WHEN
        const newState = jobAdSearchReducer(state, action);

        // THEN
        expect(newState.jobSearchFilter.occupations).toEqual(payload.occupations);
        expect(newState.jobSearchFilter.keywords).toEqual(payload.keywords);
        expect(newState.jobSearchFilter.localities).toEqual(payload.localities);

        expect(newState.jobSearchFilter.sort).toEqual(initialState.jobSearchFilter.sort);
        expect(newState.jobSearchFilter.contractType).toEqual(initialState.jobSearchFilter.contractType);

        verifyUnchanged(newState, initialState, ['jobSearchFilter']);
        verifyUnchanged(newState.jobSearchFilter, initialState.jobSearchFilter, ['occupations', 'keywords', 'localities']);
    });

    /* APPLY_FILTER_VALUES
     * it should update state with new FilterPanelValues
     */
    it('APPLY_FILTER_VALUES : should update state with new FilterPanelValues', () => {
        // GIVEN
        const payload: FilterPanelValues = filterPanelValues;

        const jobSearchFilterChanged: JobSearchFilter = {
            ...payload,
            occupations: [],
            keywords: [],
            localities: []
        };

        const action = new ApplyFilterValuesAction(payload);

        // WHEN
        const newState = jobAdSearchReducer(initialState, action);

        // THEN
        expect(newState.jobSearchFilter).toEqual(jobSearchFilterChanged);

        verifyUnchanged(newState, initialState, ['jobSearchFilter']);
    });

    /*
     * APPLY_FILTER
     * it should update state with new jobSearchFilter (FilterValues and QueryValues)
     * page should be 0 and resultAreLoading should be true
     */
    it('APPLY_FILTER : should update jobSearchFilter', () => {
        // GIVEN
        const payload: JobSearchFilter = {
            ...filterPanelValues,
            ...queryPanelValues
        };

        const action = new ApplyFilterAction(payload);

        // WHEN
        const newState = jobAdSearchReducer(initialState, action);

        // THEN
        expect(newState.jobSearchFilter).toEqual(payload);
        expect(newState.page).toBeNumber();
        expect(newState.page).toEqual(0);
        expect(newState.resultsAreLoading).toBeTruthy();
    });

    /*
     * FILTER_APPLIED
     * it should update state with Array of JobAdvertisement (page) and totalCount
     */
    it('FILTER_APPLIED : it should update Array of JobAdvertisement and totalCount', () => {
       // GIVEN
       const action = new FilterAppliedAction( { page: jobAdPageOne, totalCount: 50});

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

    /*
     * OCCUPATION_LANGUAGE_CHANGED_ACTION
     * it should update (translate) Occupation CATEGORY based on input language
     */
    it('OCCUPATION_LANGUAGE_CHANGED_ACTION : should update occupation category for language and value', () => {
        // GIVEN
        const profCode: ProfessionCode[] = [{ type: 'SBN3', value: '361' }];
        const classificationDE = new OccupationMultiTypeaheadItem(
            OccupationMultiTypeaheadItemType.CLASSIFICATION, profCode, 'Berufe der Informatik', 10);
        const classificationEN = new OccupationMultiTypeaheadItem(
            OccupationMultiTypeaheadItemType.CLASSIFICATION, profCode, 'IT occupations', 10);
        const state: JobAdSearchState = {
            ...initialState,
            jobSearchFilter: {
                ...initialState.jobSearchFilter,
                occupations: [ classificationDE ]
            }
        };

        const action = new OccupationLanguageChangedAction( { occupations: [ classificationEN ] });

        // WHEN
        const newState = jobAdSearchReducer(state, action);

        // THEN
        expect(newState.jobSearchFilter.occupations).toBeNonEmptyArray();
        expect(newState.jobSearchFilter.occupations).toEqual([ classificationEN ]);

        verifyUnchanged(newState, state, ['jobSearchFilter']);
        verifyUnchanged(newState.jobSearchFilter, state.jobSearchFilter, ['occupations']);
    });

    /*
     * RESET_FILTER
     * it should update filter and query values to their initial state
     * but other state elements should be still unchanged at this point
     */
    it('RESET_FILTER : should update filter and query values to their initial state', () => {
       // GIVEN
       const action = new ResetFilterAction({});

       // WHAT
       const newState = jobAdSearchReducer(jobAdStateChanged, action);

       // THEN
       expect(newState.jobSearchFilter).toEqual(initialState.jobSearchFilter);

       verifyUnchanged(newState, jobAdStateChanged, ['jobSearchFilter']);
    });

    /*
     * LOAD_NEXT_PAGE
     * results are loading should be flagged true
     */
    it('LOAD_NEXT_PAGE : should only flag true that results are loading', () => {
        // GIVEN
        const action = new LoadNextPageAction();

        // WHEN
        const newState = jobAdSearchReducer(initialState, action);

        //THEN
        expect(newState.resultsAreLoading).toBeTruthy();

        verifyUnchanged(newState, initialState, ['resultsAreLoading']);
    });

    /*
     * NEXT_PAGE_LOADED
     * it should update resultList with new add payload, also the page number and
     * flagged false the results are loading
     */
    it('NEXT_PAGE_LOADED : should update resultList, page and results are loading flagged false', () => {
       // GIVEN
        const jobAdPageTwo: JobAdvertisement[] = [
            createJobAdvertisement('06'),
            createJobAdvertisement('07'),
            createJobAdvertisement('08'),
            createJobAdvertisement('09'),
            createJobAdvertisement('10')
        ];

        const action = new NextPageLoadedAction({ page: jobAdPageTwo });

       // WHEN
        const newState = jobAdSearchReducer(jobAdStateChanged, action);

       // THEN
       expect(newState.page).toEqual(jobAdStateChanged.page + 1);
       expect(newState.resultsAreLoading).toBeFalsy();
       expect(newState.resultList).toBeNonEmptyArray();
       expect(newState.resultList).toBeArrayOfSize(jobAdStateChanged.resultList.length + jobAdPageTwo.length);

       verifyUnchanged(newState, jobAdStateChanged, ['page', 'resultsAreLoading', 'resultList']);
    });

    /*
     * JOB_ADVERTISEMENT_DETAIL_LOADED
     * it should update selectedJobAdvertisement and visitedJobAds
     */
    it('JOB_ADVERTISEMENT_DETAIL_LOADED : should update selectedJobAdvertisement and visitedJobAds', () => {
       // GIVEN
       const selectedJobAdOne = jobAdPageOne[0];
       const visitedJobAdOne = { [ selectedJobAdOne.id]: true };

       let action = new JobAdvertisementDetailLoadedAction({ jobAdvertisement: selectedJobAdOne } );

       // WHEN
       const newStateOne = jobAdSearchReducer(jobAdStateChanged, action);

       // THEN
       expect(newStateOne.selectedJobAdvertisement).toEqual(selectedJobAdOne);
       expect(newStateOne.visitedJobAds).toEqual(visitedJobAdOne);

       verifyUnchanged(newStateOne, jobAdStateChanged, ['selectedJobAdvertisement', 'visitedJobAds']);

       // GIVEN
       const selectedJobAdTwo = jobAdPageOne[4];
       const visitedJobAdTwo = { [selectedJobAdOne.id]: true , [selectedJobAdTwo.id]: true };

       action = new JobAdvertisementDetailLoadedAction({ jobAdvertisement: selectedJobAdTwo } );

       // WHEN
       const newStateTwo = jobAdSearchReducer(newStateOne, action);

       // THEN
       expect(newStateTwo.selectedJobAdvertisement).toEqual(selectedJobAdTwo);
       expect(newStateTwo.visitedJobAds).toEqual(visitedJobAdTwo);

       verifyUnchanged(newStateTwo, newStateOne, ['selectedJobAdvertisement', 'visitedJobAds']);
    });

});

// check if key elements of an object are unchanged
function verifyUnchanged(afterAction, beforeAction, ignoreFields: Array<string>) {
    Object.keys(afterAction)
        .filter((key: string) => ignoreFields.indexOf(key) < 0)
        .forEach((key: string) => {
            expect(afterAction[key]).toEqual(beforeAction[key]);
        });
}
