import { Store, StoreModule } from '@ngrx/store';
import {
  CANDIDATE_SEARCH_EFFECTS_DEBOUNCE,
  CANDIDATE_SEARCH_EFFECTS_SCHEDULER,
  CandidateSearchEffects,
  candidateSearchReducer,
  CandidateSearchState
} from '..';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { getTestScheduler } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';

import { CandidateRepository } from '../../../shared/backend-services/candidate/candidate.repository';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { OccupationSuggestionService } from '../../../shared/occupations/occupation-suggestion.service';
import SpyObj = jasmine.SpyObj;

describe('CandidateSearchEffects', () => {
  let sut: CandidateSearchEffects;

  let actions$: Observable<any>;
  let store: Store<CandidateSearchState>;
  let candidateRepository: SpyObj<CandidateRepository>;
  let occupationSuggestionService: SpyObj<OccupationSuggestionService>;
  let router: Router;

  beforeEach(() => {
    candidateRepository = jasmine.createSpyObj('mockCandidateRepository', ['search']);
    router = jasmine.createSpyObj('mockRouter', ['navigate']);
    occupationSuggestionService = jasmine.createSpyObj('mockOccupationSuggestionService', ['translateAll']);

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ 'candidateSearch': candidateSearchReducer })
      ],
      providers: [
        CandidateSearchEffects,
        provideMockActions(() => actions$),
        { provide: CandidateRepository, useValue: candidateRepository },
        { provide: OccupationSuggestionService, useValue: occupationSuggestionService },
        { provide: Router, useValue: router },
        { provide: CANDIDATE_SEARCH_EFFECTS_DEBOUNCE, useValue: 30 },
        { provide: CANDIDATE_SEARCH_EFFECTS_SCHEDULER, useFactory: getTestScheduler },
      ]
    });

    sut = TestBed.get(CandidateSearchEffects);
    actions$ = TestBed.get(Actions);
    store = TestBed.get(Store);
  });

  describe('initCandidateSearch$', () => {

  });
});
