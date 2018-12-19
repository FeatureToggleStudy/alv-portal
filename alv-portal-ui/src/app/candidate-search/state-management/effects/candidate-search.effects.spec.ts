import { Store, StoreModule } from '@ngrx/store';
import { CandidateSearchState } from '../state/candidate-search.state';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { getTestScheduler } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { candidateSearchReducer } from '../reducers/candidate-search.reducers';
import {
  CANDIDATE_SEARCH_EFFECTS_DEBOUNCE,
  CANDIDATE_SEARCH_EFFECTS_SCHEDULER,
  CandidateSearchEffects
} from './candidate-search.effects';
import { Observable } from 'rxjs/index';

describe('CandidateSearchEffects', () => {
  let sut: CandidateSearchEffects;

  let store: Store<CandidateSearchState>;
  let actions$: Observable<any>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ 'candidateSearch': candidateSearchReducer })
      ],
      providers: [
        CandidateSearchEffects,
        provideMockActions(() => actions$),
        { provide: CANDIDATE_SEARCH_EFFECTS_DEBOUNCE, useValue: 30 },
        { provide: CANDIDATE_SEARCH_EFFECTS_SCHEDULER, useFactory: getTestScheduler },
      ]
    });

    sut = TestBed.get(CandidateSearchEffects);
    actions$ = TestBed.get(Actions);
    store = TestBed.get(Store);
  });

  describe('initCandidateSearch$', () => {

  })


});
