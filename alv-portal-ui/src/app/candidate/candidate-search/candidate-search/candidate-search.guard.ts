import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ApplyFilterAction,
  ApplyQueryValuesAction,
  CandidateSearchState,
  InitializeResultListAction, SearchProfileUpdatedAction
} from '../state-management';
import { CandidateSearchFilterParameterService } from './candidate-search-filter-parameter.service';
import { map, tap } from 'rxjs/operators';
import { CandidateSearchProfilesRepository } from '../../../shared/backend-services/candidate-search-profiles/candidate-search-profiles.repository';
import { CandidateSearchProfileService } from './candidate-search-profile/candidate-search-profile.service';

@Injectable()
export class CandidateSearchGuard implements CanActivate {

  constructor(private router: Router,
              private candidateSearchFilterParameterService: CandidateSearchFilterParameterService,
              private candidateSearchProfilesRepository: CandidateSearchProfilesRepository,
              private candidateSearchProfileService: CandidateSearchProfileService,
              private store: Store<CandidateSearchState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const filterString = route.queryParams['filter'];
    if (filterString) {
      const searchFilter = this.candidateSearchFilterParameterService.decodeSearchFilter(filterString);
      if (searchFilter) {
        this.store.dispatch(new ApplyFilterAction(searchFilter));
        this.router.navigate(['candidate-search']);
        return false;
      }
    }
    const queryValuesString = route.queryParams['query-values'];
    if (queryValuesString) {
      const queryPanelValues = this.candidateSearchFilterParameterService.decodeQueryPanelValues(queryValuesString);
      if (queryPanelValues) {
        this.store.dispatch(new ApplyQueryValuesAction(queryPanelValues, true));
        this.router.navigate(['candidate-search']);
        return false;
      }
    }

    const searchProfileId = route.queryParams['search-profile-id'];
    if (searchProfileId) {
      return this.candidateSearchProfilesRepository.findById(searchProfileId).pipe(
        tap(searchProfile => {
          this.store.dispatch(new SearchProfileUpdatedAction({searchProfile: searchProfile}));
          this.store.dispatch(new ApplyFilterAction(this.candidateSearchProfileService.mapFromRequest(searchProfile.searchFilter)));
          this.router.navigate(['candidate-search']);
        }),
        map(() => false)
      );
    }

    this.store.dispatch(new InitializeResultListAction());
    return true;
  }
}
