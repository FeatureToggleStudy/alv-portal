import {
  JOB_AD_SEARCH_EFFECTS_DEBOUNCE,
  JOB_AD_SEARCH_EFFECTS_SCHEDULER,
  JobAdSearchEffects
} from './job-ad-search.effects';
import { Actions } from '@ngrx/effects';
import { JobAdvertisementRepository } from '../../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { initialState, JobAdSearchState } from '../state';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import {
  ApplyFilterAction,
  ApplyFilterValuesAction,
  ApplyQueryValuesAction,
  FilterAppliedAction,
  FilterResetAction,
  InitializeResultListAction,
  LoadNextJobAdvertisementDetailAction,
  NextPageLoadedAction,
  ResetFilterAction
} from '../actions';
import { Observable } from 'rxjs';
import { JobAdvertisementWithFavourites } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { jobAdSearchReducer } from '../reducers';
import { OccupationSuggestionService } from '../../../../shared/occupations/occupation-suggestion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EffectErrorOccurredAction } from '../../../../core/state-management/actions/core.actions';
import { FilterPanelValues } from '../../job-search/filter-panel/filter-panel.component';
import { JobQueryPanelValues } from '../../../../widgets/job-search-widget/job-query-panel/job-query-panel-values';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import SpyObj = jasmine.SpyObj;

describe('JobAdSearchEffects', () => {
  let sut: JobAdSearchEffects;

  let store: Store<JobAdSearchState>;
  let actions$: Observable<any>;
  let jobAdService: SpyObj<JobAdvertisementRepository>;
  let occupationSuggestionService: SpyObj<OccupationSuggestionService>;
  let router: Router;

  beforeEach(() => {
    router = jasmine.createSpyObj('mockRouter', ['navigate']);
    jobAdService = jasmine.createSpyObj('mockJobAdsService', ['search', 'findById']);
    occupationSuggestionService = jasmine.createSpyObj('mockOccupationSuggestionService', ['translateAll']);

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ 'jobAdSearch': jobAdSearchReducer }),
        HttpClientTestingModule
      ],
      providers: [
        JobAdSearchEffects,
        provideMockActions(() => actions$),
        { provide: Router, useValue: router },
        { provide: OccupationSuggestionService, useValue: occupationSuggestionService },
        { provide: JobAdvertisementRepository, useValue: jobAdService },
        { provide: JOB_AD_SEARCH_EFFECTS_DEBOUNCE, useValue: 30 },
        { provide: JOB_AD_SEARCH_EFFECTS_SCHEDULER, useFactory: getTestScheduler },
      ]
    });

    sut = TestBed.get(JobAdSearchEffects);
    actions$ = TestBed.get(Actions);
    store = TestBed.get(Store);
  });

  describe('initJobSearch$', () => {

    const initResultListAction = new InitializeResultListAction();

    const jobAd: any = { id: 1 };
    const result = [{jobAdvertisement: jobAd, favouriteItem: null} as JobAdvertisementWithFavourites];
    const jobAdSearchResult = {
      totalCount: 10,
      result
    };

    const filterApplied = new FilterAppliedAction({
      page: result,
      totalCount: 10
    });

    /*
     * action : triggered 1x after 10 F and 40 F delay and after it continues
     * response : returned after 20 F delay
     * expected : 10 F + 20 F = 30 F delay before we emit 1st result, and 40 F + 20 F = 60 F delay before 2nd result
     */
    it('should return a new FilterAppliedAction on success', () => {

      // action
      actions$ = hot('-a--a--', { a: initResultListAction });
      // response
      jobAdService.search.and.returnValue(cold('--b|', { b: jobAdSearchResult }));
      // expected
      const expected = cold('---c--c-', { c: filterApplied });

      expect(sut.initJobSearch$).toBeObservable(expected);
    });

    /*
     * action : triggered 'a' 1x after 10 F delay and after it continues 2x with 'b' which shouldn't be executed
     * response : returned empty response after 20 F delay and more importantly ends subscription
     * expected : 10 F + ends subscription = 10 F delay before we emit result which is ending of subscription
     *
     * response delay here isn't counted because we are ending subscription after first triggering 'a'
     */
    // TODO FIX TEST SINCE WE DO NOT UNSUBSCRIBE ANYMORE
    xit('should complete (unsubscribe) after FilterAppliedAction is triggered', () => {

      // action
      actions$ = hot('-a-b--b-', {
        a: filterApplied,
        b: initResultListAction
      });
      // response
      jobAdService.search.and.returnValue(cold('--|', {}));
      // expected
      const expected = cold('-|----');

      expect(sut.initJobSearch$).toBeObservable(expected);
    });

    /*
     * action : triggered 'a' 2x after 10 F and 30 F delay and after it continues with 'b' after 60 F delay
     * response : returned values :
     *    1st: ERROR response after 10 F delay (for 1st 'a')
     *    2nd: value response after 10 F delay (for 2nd 'a')
     *    3rd: end subscription after filterApplied action (irrelevant of F delays) (for 'b')
     * expected : 3 emitted actions, one from error and one successful action and ending subscription from initResultListAction
     *    1st: ERROR response after 10 F + 10 F = 20 F delay
     *    2nd: value response after another 30 F + 10 F = 40 F delay
     *    3rd: end subscription after 60 F delay (irrelevant of response F)
     */
    it('should throw an EffectErrorOccurredAction on error, then proceed to another InitializeResultListAction, ' +
      'and finish with an FilterAppliedAction', () => {

      const httpError = new HttpErrorResponse({});

      // action
      actions$ = hot('-a-a--b', {
        a: initResultListAction,
        b: filterApplied
      });
      // response
      jobAdService.search.and.returnValues(
        cold('-#', {}, httpError),
        cold('-c', {c: jobAdSearchResult})
      );
      // expected
      const expected = cold('--e-d', {
        e: new EffectErrorOccurredAction({ httpError }),
        d: filterApplied
      });

      expect(sut.initJobSearch$).toBeObservable(expected);
    });

  });

  describe('applyFilter$', () => {

    const jobSearchFilter = initialState.jobSearchFilter;
    const applyFilterAction = new ApplyFilterAction(jobSearchFilter);

    const jobAd: any = { id: 1 };
    const result = [{jobAdvertisement: jobAd, favouriteItem: null} as JobAdvertisementWithFavourites];
    const jobAdSearchResult = {
      totalCount: 10,
      result
    };

    const filterApplied = new FilterAppliedAction({
      page: result,
      totalCount: 10
    });

    const httpError = new HttpErrorResponse({});

    /*
     * action : triggered 3x, but only last 'a' is dispatched after 50 F delay
     * response : returned after 10 F delay
     * expected : 50 F + 10 F + 30 F from the debounce = 90 F delay before we emit result
     */
    it('should return a new FilterAppliedAction on success, and completes with de-bouncing', () => {

      // action
      actions$ = hot('-a-a-a', { a: applyFilterAction });
      // response
      jobAdService.search.and.returnValue(cold('-b|', { b: jobAdSearchResult }));
      // expected
      const expected = cold('---------c', { c: filterApplied });

      expect(sut.applyFilter$).toBeObservable(expected);
    });

    /*
     * action : triggered 3x, but only 2nd and 3rd 'a' are dispatched, 2nd after 30 F delay and 3rd after 70 F delay
     * response : returned after 10 F delay (both actions)
     * expected : emit 2 same action results,
     *    1st: after 30 F + 10 F + 30 F from the debounce = 70 F delay
     *    2nd: after 70 F + 10 F + 30 F from the debounce = 110 F delay (all together from the start!)
     */
    it('should return multiple new FilterAppliedAction on success, and completes with de-bouncing', () => {

      // action
      actions$ = hot('-a-a---a', { a: applyFilterAction });
      // response
      jobAdService.search.and.returnValue(cold('-b|', { b: jobAdSearchResult }));
      // expected
      const expected = cold('-------c---c', { c: filterApplied });

      expect(sut.applyFilter$).toBeObservable(expected);
    });

    /*
     * action : dispatched after 10 F delay
     * response : return ERROR after 10 F delay
     * expected : 10 F + 10 F + 30 F from the debounce = 50 F delay before we emit result
     */
    it('should return an EffectErrorOccurredAction on error', () => {

      // action
      actions$ = hot('-a', { a: applyFilterAction });
      // response
      jobAdService.search.and.returnValue(cold('-#|', {}, httpError));
      // expected
      const expected = cold('-----c', {
        c: new EffectErrorOccurredAction({ httpError })
      });

      expect(sut.applyFilter$).toBeObservable(expected);
    });

    /*
     * action : dispatched after 10 F delay and after debounce again after 50 F delay
     * response : return ERROR after 10 F delay, and another response is correct result after additional 10 F delay
     * expected : two emitted results, one error and one successful
     *    1st: after 10 F + 10 F + 30 F debounce = 50 F delay (emitted ERROR)
     *    2nd: after 50 F + 10 F + 30 F debounce = 90 F delay (emitted valid result)
     */
    it('should return an EffectErrorOccurredAction on error, and after it correct result', function () {
      // action
      actions$ = hot('-a---a-', { a: applyFilterAction });
      // response
      jobAdService.search.and.returnValues(
          cold('-#', {}, httpError),
          cold('-b', {b: jobAdSearchResult})
      );
      // expected
      const expected = cold('-----e---c-', {
        e: new EffectErrorOccurredAction({ httpError }),
        c: filterApplied
      });

      expect(sut.applyFilter$).toBeObservable(expected);
    });

  });

  describe('applyFilterAndQueryValues$', () => {

    const applyFilterAction = new ApplyFilterAction(initialState.jobSearchFilter);

    /*
     * action : trigger applyFilterValuesAction after 10 F delay
     * expected : emit applyFilterAction after 10 F delay
     */
    it('should return new ApplyFilterAction when ApplyFilterValues is called', () => {

      const applyFilterValuesAction = new ApplyFilterValuesAction(initialState.jobSearchFilter as FilterPanelValues);

      // action
      actions$ = hot('-a', { a: applyFilterValuesAction });
      // expected
      const expected = cold('-b', { b: applyFilterAction });

      expect(sut.applyFilterValues$).toBeObservable(expected);
    });

    /*
     * action : trigger applyQueryValuesAction after 10 F delay
     * expected : emit applyFilterAction after 10 F delay
     */
    it('should return new ApplyFilterAction when ApplyQueryValues is called', () => {

      const applyQueryValuesAction = new ApplyQueryValuesAction(initialState.jobSearchFilter as JobQueryPanelValues);

      // action
      actions$ = hot('-a', { a: applyQueryValuesAction });
      // expected
      const expected = cold('-b', { b: applyFilterAction });

      expect(sut.applyQueryValues$).toBeObservable(expected);
    });

  });

  describe('resetFilter$', () => {

    /*
     * action : trigger resetFilterAction after 10 F delay
     * expected : emit both applyFilterAction and filterResetAction in same frame after 10 F delay
     */
    it('should reset filter to initial state', () => {

      const resetFilterAction = new ResetFilterAction({});
      const applyFilterAction = new ApplyFilterAction(initialState.jobSearchFilter);
      const filterResetAction = new FilterResetAction(initialState.jobSearchFilter);

      // action
      actions$ = hot('-a', { a: resetFilterAction });
      // expected
      const expected = cold('-(bc)', { b: applyFilterAction, c: filterResetAction });

      expect(sut.resetFilter$).toBeObservable(expected);
    });

  });

  describe('loadNextJobAdvertisementDetail$', () => {

    /*
     * action : triggered 3x, 'a' after 10 F  and 30 F delay, and 'b' after 60 F delay
     * response : returned after 10 F delay result (irrelevant because we are actually triggering
     *    nextPageLoadedAction in H.O. so it's already returned response there, with no delay
     * expected : emit result after 60 F delay, when we get nextPageLoadedAction
     */
    it('should load next job ad', () => {

      const jobAd: any = { id: 'job-ad-001' };
      const result = [{jobAdvertisement: jobAd, favouriteItem: null} as JobAdvertisementWithFavourites];

      const loadNextJobAdvertisementDetailAction = new LoadNextJobAdvertisementDetailAction();
      const nextPageLoadedAction = new NextPageLoadedAction({ page: result });

      // action
      actions$ = hot('-a-a--b--', {
        a: loadNextJobAdvertisementDetailAction,
        b: nextPageLoadedAction
      });

      // expected
      const expected = cold('------d-', {
        d: { type: 'nothing' }
      });

      expect(sut.loadNextJobAdvertisementDetail$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(['/job-search', 'job-ad-001']);
    });
  });

});
