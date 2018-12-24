import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ApplyFilterAction,
  ApplyQueryValuesAction,
  InitResultListAction
} from '../state-management/actions/job-ad-search.actions';
import { JobSearchFilter } from '../state-management/state/job-search-filter.types';
import { JobAdSearchState } from '../state-management/state/job-ad-search.state';
import { JobSearchFilterParameterService } from './job-search-filter-parameter.service';

@Injectable()
export class JobSearchGuard implements CanActivate {

  constructor(private router: Router,
              private jobSearchFilterParameterService: JobSearchFilterParameterService,
              private store: Store<JobAdSearchState>) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    const filterString = route.queryParams['filter'];
    if (filterString) {
      const filter = this.extractFilterFromParam(filterString);
      if (filter) {
        this.store.dispatch(new ApplyFilterAction(filter));
        this.router.navigate(['job-search']);
        return false;
      }
    }
    const queryString = route.queryParams['query-values'];
    if (queryString) {
      const queryFilterValues = this.jobSearchFilterParameterService.decodeQueryPanelValues(queryString);
      this.store.dispatch(new ApplyQueryValuesAction(queryFilterValues, true));
      this.router.navigate(['job-search']);
      return false;
    }

    this.store.dispatch(new InitResultListAction());

    return true;
  }

  private extractFilterFromParam(jobSearchFilterParamValue: string): JobSearchFilter {
    if (!jobSearchFilterParamValue) {
      return null;
    }
    return this.jobSearchFilterParameterService.decode(jobSearchFilterParamValue);
  }

}
