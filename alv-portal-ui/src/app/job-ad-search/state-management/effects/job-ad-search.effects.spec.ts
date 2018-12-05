import {
  JOB_AD_SEARCH_EFFECTS_DEBOUNCE,
  JOB_AD_SEARCH_EFFECTS_SCHEDULER,
  JobAdSearchEffects
} from './job-ad-search.effects';
import { Actions } from '@ngrx/effects';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { initialState, JobAdSearchState } from '../state/job-ad-search.state';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { getTestScheduler, hot } from 'jasmine-marbles';
import { InitResultListAction } from '../actions/job-ad-search.actions';

describe('JobAdSearchEffects', () => {
  let jobAdSearchEffects: JobAdSearchEffects;

  let mockActions$: Actions;
  let mockJobAdsService: JobAdvertisementRepository;
  let mockStore: Store<JobAdSearchState>;
  let mockRouter: Router;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
    mockStore = jasmine.createSpyObj('mockStore', ['pipe', 'dispatch']);
    mockJobAdsService = jasmine.createSpyObj('mockJobAdsService', ['search', 'findById']);

    TestBed.configureTestingModule({
      providers: [
        JobAdSearchEffects,
        provideMockActions(() => mockActions$),
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore },
        { provide: JobAdvertisementRepository, useValue: mockJobAdsService },
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore },
        { provide: JOB_AD_SEARCH_EFFECTS_DEBOUNCE, useValue: 30 },
        { provide: JOB_AD_SEARCH_EFFECTS_SCHEDULER, useFactory: getTestScheduler },
      ]
    });

    jobAdSearchEffects = TestBed.get(JobAdSearchEffects);

  });

  describe('initJobSearch$', () => {
    const initResultListAction = new InitResultListAction();

    it('should work', () => {
      // todo: implement
      expect(true).toBe(true);
    });

  });
});
