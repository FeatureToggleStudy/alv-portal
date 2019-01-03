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
  InitResultListAction
} from '../state-management';
import { CandidateSearchFilterParameterService } from './candidate-search-filter-parameter.service';

@Injectable()
export class CandidateSearchGuard implements CanActivate {

  constructor(private router: Router,
              private candidateSearchFilterParameterService: CandidateSearchFilterParameterService,
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

    this.store.dispatch(new InitResultListAction());
    return true;
  }
}
