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
  CandidateSearchFilter,
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
      const filter = this.extractFilterFromParam(filterString);
      if (filter) {
        this.store.dispatch(new ApplyFilterAction(filter));
        this.router.navigate(['candidate-search']);
        return false;
      }
    }
    const queryString = route.queryParams['query-values'];
    if (queryString) {
      const queryFilterValues = this.candidateSearchFilterParameterService.decodeQueryPanelValues(queryString);
      this.store.dispatch(new ApplyQueryValuesAction(queryFilterValues, true));
      this.router.navigate(['candidate-search']);
      return false;
    }

    this.store.dispatch(new InitResultListAction());
    return true;
  }

  private extractFilterFromParam(filterAsString: string): CandidateSearchFilter {
    if (!filterAsString) {
      return null;
    }
    return this.candidateSearchFilterParameterService.decode(filterAsString);
  }
}
