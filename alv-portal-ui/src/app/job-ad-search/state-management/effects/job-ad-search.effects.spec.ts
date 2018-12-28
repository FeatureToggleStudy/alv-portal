import {
  JOB_AD_SEARCH_EFFECTS_DEBOUNCE,
  JOB_AD_SEARCH_EFFECTS_SCHEDULER,
  JobAdSearchEffects
} from './job-ad-search.effects';
import { Actions } from '@ngrx/effects';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { initialState, JobAdSearchState } from '../state/job-ad-search.state';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import {
  ApplyFilterAction,
  FilterAppliedAction,
  InitResultListAction,
  LoadNextJobAdvertisementDetailAction,
  NextPageLoadedAction
} from '../actions/job-ad-search.actions';
import { Observable } from 'rxjs/index';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { jobAdSearchReducer } from '../reducers/job-ad-search.reducers';
import { OccupationSuggestionService } from '../../../shared/occupations/occupation-suggestion.service';
import { HttpErrorResponse } from "@angular/common/http";
import { EffectErrorOccurredAction } from "../../../core/state-management/actions/core.actions";
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
        StoreModule.forRoot({ 'jobAdSearch': jobAdSearchReducer })
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

    const initResultListAction = new InitResultListAction();

    const jobAd: any = { id: 1 };
    const result = [jobAd as JobAdvertisement];
    const jobAdSearchResult = {
      totalCount: 10,
      result
    };

    const filterApplied = new FilterAppliedAction({
      page: result,
      totalCount: 10
    });

    it('should return a new FilterAppliedAction on success, and completes', () => {
      actions$ = hot('-a--a-', { a: initResultListAction });
      jobAdService.search.and.returnValue(cold('--b|', { b: jobAdSearchResult }));

      const expected = cold('---c|-', {
        c: new FilterAppliedAction({
          page: result,
          totalCount: 10
        })
      });

      expect(sut.initJobSearch$).toBeObservable(expected);
    });

    it('should complete after FilterAppliedAction', () => {

      actions$ = hot('-a-b--b-', {
        a: filterApplied,
        b: initResultListAction
      });
      jobAdService.search.and.returnValue(cold('-c|', { c: {} }));

      const expected = cold('-|--');

      expect(sut.initJobSearch$).toBeObservable(expected);
    });

    it('should throw an EffectErrorOccurredAction on error, then proceed to another InitResultListAction, ' +
      'and finish with an FilterAppliedAction and terminate subscription to initJobSearch', () => {

      const httpError = new HttpErrorResponse({});

      actions$ = hot('-a-a--b', { a: initResultListAction, b: filterApplied });
      jobAdService.search.and.returnValues(
        cold('-#', {}, httpError),
        cold('-c|', {c: jobAdSearchResult})
      );

      const expected = cold('--e-d-|', {
        e: new EffectErrorOccurredAction({ httpError }),
        d: filterApplied
      });

      expect(sut.initJobSearch$).toBeObservable(expected);
    });

  });

  describe('applyFilter$', () => {

    const jobSearchFilter = initialState.jobSearchFilter;
    const applyFilterAction = new ApplyFilterAction(jobSearchFilter);

    it('should return a new FilterAppliedAction on success, and completes with debouncing', () => {

      const jobAd: any = { id: 1 };
      const result = [jobAd as JobAdvertisement];
      const jobAdSearchResult = {
        totalCount: 10,
        result
      };

      actions$ = hot('-a-a-a', { a: applyFilterAction });
      jobAdService.search.and.returnValue(cold('-b|', { b: jobAdSearchResult }));
      const expected = cold('---------c', { // debouncing 30 = 3 x _
        c: new FilterAppliedAction({
          page: result,
          totalCount: 10
        })
      });

      expect(sut.applyFilter$).toBeObservable(expected);
    });

    it('should return an EffectErrorOccurredAction on error', () => {

      const httpError = new HttpErrorResponse({});

      actions$ = hot('-a---', { a: applyFilterAction });
      jobAdService.search.and.returnValue(cold('-#|', {}, httpError));
      const expected = cold('-----c', {
        c: new EffectErrorOccurredAction({ httpError })
      });

      expect(sut.applyFilter$).toBeObservable(expected);
    });
  });

  describe('loadNextJobAdvertisementDetail$', () => {

    it('should load next job ad', () => {
      const jobAd: any = { id: 'job-ad-001' };
      const result = [jobAd as JobAdvertisement];

      const jobAdSearchResult = {
        totalCount: 10,
        result
      };

      const loadNextJobAdvertisementDetailAction = new LoadNextJobAdvertisementDetailAction();
      const nextPageLoadedAction = new NextPageLoadedAction({ page: result });

      actions$ = hot('-a-b--b', {
        a: loadNextJobAdvertisementDetailAction,
        b: nextPageLoadedAction
      });
      jobAdService.search.and.returnValue(cold('-b|', { b: jobAdSearchResult }));

      const expected = cold('---c---', {
        c: { type: 'nothing' }
      });

      expect(sut.loadNextJobAdvertisementDetail$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(['/job-search', 'job-ad-001']);
    });
  });

});
