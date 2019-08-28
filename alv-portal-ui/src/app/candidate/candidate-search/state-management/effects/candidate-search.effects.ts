import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';
import { SchedulerLike } from 'rxjs/src/internal/types';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  debounceTime,
  filter,
  flatMap,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { Action, select, Store } from '@ngrx/store';
import { CandidateRepository } from '../../../../shared/backend-services/candidate/candidate.repository';
import {
  asyncScheduler,
  combineLatest,
  Observable,
  of,
  OperatorFunction
} from 'rxjs/index';
import {
  EffectErrorOccurredAction,
  LANGUAGE_CHANGED,
  LanguageChangedAction,
  LAZY_LOADED_MODULE_DESTROYED,
  LazyLoadedModuleDestroyedAction,
  ModuleName
} from '../../../../core/state-management/actions/core.actions';
import {
  APPLY_FILTER,
  APPLY_FILTER_VALUES,
  APPLY_QUERY_VALUES,
  ApplyFilterAction,
  FilterAppliedAction,
  FilterResetAction,
  INITIALIZE_RESULT_LIST,
  LOAD_NEXT_CANDIDATE_PROFILE_DETAIL,
  LOAD_NEXT_PAGE,
  LOAD_PREVIOUS_CANDIDATE_PROFILE_DETAIL,
  LoadNextPageAction,
  NEXT_PAGE_LOADED,
  NextPageLoadedAction,
  OccupationLanguageChangedAction,
  RESET_FILTER,
  ResetAction,
  ResultListInitializedAction
} from '../actions';
import { Router } from '@angular/router';
import { OccupationSuggestionService } from '../../../../shared/occupations/occupation-suggestion.service';
import {
  CandidateSearchResult,
  CandidateSearchState,
  getCandidateSearchFilter,
  getCandidateSearchState,
  getNextId,
  getPrevId,
  getResultList,
  getSelectedOccupations,
  getVisitedCandidates
} from '../state';
import { CandidateSearchRequestMapper } from './candidate-search-request.mapper';
import { findRelevantJobExperience } from '../../candidate-rules';
import * as xxhash from 'xxhashjs/build/xxhash.js';
import {
  CandidateProfile,
  CandidateSearchResponse,
  JobExperience
} from '../../../../shared/backend-services/candidate/candidate.types';
import { OccupationCode } from '../../../../shared/backend-services/reference-service/occupation-label.types';
import {
  GenderAwareOccupationLabel,
  OccupationService
} from '../../../../shared/occupations/occupation.service';
import { I18nService } from '../../../../core/i18n.service';
import {
  CoreState,
  getCurrentLanguage
} from '../../../../core/state-management/state/core.state.ts';

const HASH = xxhash.h32(0xABCDEF);

export const CANDIDATE_SEARCH_EFFECTS_DEBOUNCE = new InjectionToken<number>('CANDIDATE_SEARCH_EFFECTS_DEBOUNCE');
export const CANDIDATE_SEARCH_EFFECTS_SCHEDULER = new InjectionToken<SchedulerLike>('CANDIDATE_SEARCH_EFFECTS_SCHEDULER');

export function computeHashCode(res: CandidateSearchResult) {
  return HASH.update(JSON.stringify(res)).digest().toString(16);
}

@Injectable()
export class CandidateSearchEffects {

  @Effect()
  reset$ = this.actions$.pipe(
    ofType(LAZY_LOADED_MODULE_DESTROYED),
    map((action: LazyLoadedModuleDestroyedAction) => action.payload),
    filter(action => action.moduleName === ModuleName.CANDIDATE_SEARCH),
    map(() => {
      return new ResetAction();
    })
  );

  @Effect()
  initCandidateSearch$ = this.actions$.pipe(
    ofType(INITIALIZE_RESULT_LIST),
    withLatestFrom(
      this.store.pipe(select(getCandidateSearchState)),
      this.store.pipe(select(getVisitedCandidates)),
      this.store.pipe(select(getSelectedOccupations)),
      this.coreStore.pipe(select(getCurrentLanguage))
    ),
    switchMap(([a, state, visitedCandidates, selectedOccupations, language]) => {
        if (state.isDirtyResultList) {
          return this.candidateRepository.searchCandidateProfiles(CandidateSearchRequestMapper.mapToRequest(state.candidateSearchFilter, state.page))
            .pipe(
              this.getCandidateMapper(visitedCandidates, selectedOccupations, language),
              catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
            );
        } else {
          return of(new ResultListInitializedAction());
        }
      }
    )
  );

  @Effect()
  applyFilter$: Observable<Action> = this.actions$.pipe(
    ofType(APPLY_FILTER),
    map((action: ApplyFilterAction) => action.payload),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    withLatestFrom(
      this.store.pipe(select(getCandidateSearchState)),
      this.store.pipe(select(getVisitedCandidates)),
      this.store.pipe(select(getSelectedOccupations)),
      this.coreStore.pipe(select(getCurrentLanguage))
    ),
    switchMap(([candidateSearchFilter, state, visitedCandidates, selectedOccupations, language]) =>
      this.candidateRepository.searchCandidateProfiles(CandidateSearchRequestMapper.mapToRequest(candidateSearchFilter, state.page)).pipe(
        this.getCandidateMapper(visitedCandidates, selectedOccupations, language),
        catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
      )),
  );

  @Effect()
  applyFilterValues$: Observable<Action> = this.actions$.pipe(
    ofType(APPLY_FILTER_VALUES),
    withLatestFrom(this.store.pipe(select(getCandidateSearchState))),
    map(([action, state]) => new ApplyFilterAction(state.candidateSearchFilter))
  );

  @Effect()
  applyQueryValues$: Observable<Action> = this.actions$.pipe(
    ofType(APPLY_QUERY_VALUES),
    withLatestFrom(this.store.pipe(select(getCandidateSearchState))),
    map(([action, state]) => new ApplyFilterAction(state.candidateSearchFilter))
  );

  @Effect()
  resetFilter$: Observable<Action> = this.actions$.pipe(
    ofType(RESET_FILTER),
    withLatestFrom(this.store.pipe(select(getCandidateSearchFilter))),
    switchMap(([action, candidateSearchFilter]) => {
      return [
        new ApplyFilterAction(candidateSearchFilter),
        new FilterResetAction(candidateSearchFilter)
      ];
    }));

  @Effect()
  translateOccupationsOnLanguageChanged$: Observable<Action> = this.actions$.pipe(
    ofType(LANGUAGE_CHANGED),
    map((a: LanguageChangedAction) => a),
    withLatestFrom(
      this.store.pipe(select(getCandidateSearchFilter)),
      this.store.pipe(select(getResultList))),
    map(([action, candidateSearchFilter, resultList]) => ({
      occupationsInSearch: this.occupationSuggestionService.translateAll(candidateSearchFilter.occupations, action.payload.language),
      resultListOccupations: this.translateAllOccupationsInResultList(resultList, action.payload.language)
    })),
    switchMap((observableMap) => {
      return combineLatest(observableMap.occupationsInSearch, observableMap.resultListOccupations);
    }),
    map(([occupationsTypeaheadItems, occupationsForSearchResults]) => {
      return new OccupationLanguageChangedAction({
        occupations: occupationsTypeaheadItems,
        occupationsForSearchResults
      });
    })
  );

  @Effect()
  loadNextPage$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_NEXT_PAGE),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    withLatestFrom(
      this.store.pipe(select(getCandidateSearchState)),
      this.store.pipe(select(getVisitedCandidates)),
      this.store.pipe(select(getSelectedOccupations)),
      this.coreStore.pipe(select(getCurrentLanguage))
    ),
    tap(x => console.log('loadNextPage$')),
    concatMap(([action, state, visitedCandidates, selectedOccupations, language]) => this.candidateRepository.searchCandidateProfiles(CandidateSearchRequestMapper.mapToRequest(state.candidateSearchFilter, state.page + 1))
      .pipe(
        flatMap((response: CandidateSearchResponse) =>
          this.getCandidateSearchResults(response, visitedCandidates, selectedOccupations, language).pipe(
            map(page => new NextPageLoadedAction({
              page: page,
              pageNumber: state.page + 1,
            }))
          )),
        catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
      )
    )
  );

  @Effect()
  loadPreviousCandidateProfileDetail$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_PREVIOUS_CANDIDATE_PROFILE_DETAIL),
    withLatestFrom(this.store.pipe(select(getPrevId))),
    map(([action, id]) => id),
    tap((id) => {
      this.router.navigate(['/candidate-search', id]);
    }),
    map(() => {
      return { type: 'nothing' };
    })
  );

  @Effect()
  loadNextCandidateProfileDetail$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_NEXT_CANDIDATE_PROFILE_DETAIL),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    withLatestFrom(this.store.pipe(select(getNextId))),
    switchMap(([action, id]) => {
      if (id) {
        return of(id);
      } else {
        this.store.dispatch(new LoadNextPageAction());
        return this.actions$.pipe(
          ofType(NEXT_PAGE_LOADED),
          take(1),
          map((nextPageLoadedAction: NextPageLoadedAction) => {
            return nextPageLoadedAction.payload.page[0].candidateProfile.id;
          })
        );
      }
    }),
    tap((id) => {
      this.router.navigate(['/candidate-search', id]);
    }),
    map(() => {
      return { type: 'nothing' };
    })
  );

  constructor(
    private occupationSuggestionService: OccupationSuggestionService,
    private actions$: Actions,
    private store: Store<CandidateSearchState>,
    private coreStore: Store<CoreState>,
    private candidateRepository: CandidateRepository,
    private router: Router,
    private occupationService: OccupationService,
    private i18nService: I18nService,
    @Optional() @Inject(CANDIDATE_SEARCH_EFFECTS_DEBOUNCE) private debounce,
    @Optional() @Inject(CANDIDATE_SEARCH_EFFECTS_SCHEDULER) private scheduler: AsyncScheduler
  ) {
  }

  private getCandidateMapper(visitedCandidates: { [id: string]: boolean },
                             selectedOccupations: OccupationCode[],
                             language: string): OperatorFunction<CandidateSearchResponse, FilterAppliedAction> {
    return flatMap((response: CandidateSearchResponse) => {
      return this.getCandidateSearchResults(response, visitedCandidates, selectedOccupations, language).pipe(
        map(page => new FilterAppliedAction({
          page,
          totalCount: response.totalCount
        }))
      );
    });
  }


  private getCandidateSearchResults(response: CandidateSearchResponse,
                                    visitedCandidates: { [p: string]: boolean },
                                    selectedOccupations: OccupationCode[],
                                    language: string): Observable<CandidateSearchResult[]> {
    const candidateSearchResults$ = response.result.map((candidateProfile: CandidateProfile) => {
      const relevantJobExperience = findRelevantJobExperience(candidateProfile, selectedOccupations);
      return this.resolveOccupation(relevantJobExperience, language).pipe(
        map((occupationLabel: GenderAwareOccupationLabel) => {
          const res: CandidateSearchResult = {
            candidateProfile,
            relevantJobExperience,
            occupationLabel,
            visited: visitedCandidates[candidateProfile.id] || false,
            hashCode: '',
          };
          res.hashCode = computeHashCode(res);
          return res;
        }));
    });
    return combineLatest(candidateSearchResults$);
  }


  private resolveOccupation(jobExperience: JobExperience, language: string): Observable<GenderAwareOccupationLabel> {
    const extractProfessionCode = this.extractProfessionCode(jobExperience);
    return this.occupationService.findLabel(extractProfessionCode, language);
  }

  private extractProfessionCode(jobExperience: JobExperience) {
    return {
      value: String(jobExperience.occupation.avamCode),
      type: 'AVAM'
    };
  }

  private translateAllOccupationsInResultList(resultList: CandidateSearchResult[], language: string): Observable<GenderAwareOccupationLabel[]> {
    return combineLatest(resultList.map(result => this.resolveOccupation(result.relevantJobExperience, language)));
  }
}
