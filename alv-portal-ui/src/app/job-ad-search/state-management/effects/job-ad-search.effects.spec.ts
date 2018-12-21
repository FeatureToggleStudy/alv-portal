import {
  JOB_AD_SEARCH_EFFECTS_DEBOUNCE,
  JOB_AD_SEARCH_EFFECTS_SCHEDULER,
  JobAdSearchEffects
} from './job-ad-search.effects';
import { Actions } from '@ngrx/effects';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { JobAdSearchState } from '../state/job-ad-search.state';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import {
  ApplyFilterAction,
  FilterAppliedAction,
  InitResultListAction
} from '../actions/job-ad-search.actions';
import { Observable } from 'rxjs/index';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { jobAdSearchReducer } from '../reducers/job-ad-search.reducers';
import { JobSearchFilter } from '../state/job-search-filter.types';
import SpyObj = jasmine.SpyObj;

describe('JobAdSearchEffects', () => {
  let jobAdSearchEffects: JobAdSearchEffects;

  let store: Store<JobAdSearchState>;
  let actions$: Observable<any>;
  let jobAdService: SpyObj<JobAdvertisementRepository>;
  let router: Router;

  beforeEach(() => {
    router = jasmine.createSpyObj('mockRouter', ['navigate']);
    jobAdService = jasmine.createSpyObj('mockJobAdsService', ['search', 'findById']);

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ 'jobAdSearch': jobAdSearchReducer })
      ],
      providers: [
        JobAdSearchEffects,
        provideMockActions(() => actions$),
        { provide: Router, useValue: router },
        { provide: JobAdvertisementRepository, useValue: jobAdService },
        { provide: JOB_AD_SEARCH_EFFECTS_DEBOUNCE, useValue: 30 },
        { provide: JOB_AD_SEARCH_EFFECTS_SCHEDULER, useFactory: getTestScheduler },
      ]
    });

    jobAdSearchEffects = TestBed.get(JobAdSearchEffects);
    actions$ = TestBed.get(Actions);
    store = TestBed.get(Store);
  });

  describe('initJobSearch$', () => {
    const initResultListAction = new InitResultListAction();

    it('should return a new FilterAppliedAction on success, and completes', () => {
      const jobAd: any = { id: 1 };
      const result = [jobAd as JobAdvertisement];

      const jobAdSearchResult = {
        totalCount: 10,
        result
      };

      actions$ = hot('-a--a-', { a: initResultListAction });
      jobAdService.search.and.returnValue(cold('--b|', { b: jobAdSearchResult }));

      const expected = cold('---c|-', {
        c: new FilterAppliedAction({
          page: result,
          totalCount: 10
        })
      });

      expect(jobAdSearchEffects.initJobSearch$).toBeObservable(expected);
    });

    it('should complete after ApplyFilterAction', () => {

      actions$ = hot('-a-b--b-', {
        a: new ApplyFilterAction({} as JobSearchFilter),
        b: initResultListAction
      });
      jobAdService.search.and.returnValue(cold('--c|', { c: {} }));

      const expected = cold('-|--');

      expect(jobAdSearchEffects.initJobSearch$).toBeObservable(expected);
    });

  });
});
