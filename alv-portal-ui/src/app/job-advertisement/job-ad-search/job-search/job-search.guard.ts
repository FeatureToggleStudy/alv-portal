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
  InitializeResultListAction,
  JobAdSearchState,
  JobSearchFilter
} from '../state-management';
import { JobSearchFilterParameterService } from './job-search-filter-parameter.service';
import { JobAdSearchProfilesRepository } from '../../../shared/backend-services/job-ad-search-profiles/job-ad-search-profiles.repository';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JobSearchProfileService } from '../job-search-profile/job-search-profile.service';

@Injectable()
export class JobSearchGuard implements CanActivate {

  constructor(private router: Router,
              private jobSearchFilterParameterService: JobSearchFilterParameterService,
              private jobSearchProfileService: JobSearchProfileService,
              private jobAdSearchProfilesRepository: JobAdSearchProfilesRepository,
              private store: Store<JobAdSearchState>) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Observable<boolean> {

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

    const searchProfileId = route.queryParams['search-profile-id'];
    if (searchProfileId) {
      return this.jobAdSearchProfilesRepository.findById(searchProfileId).pipe(
        tap(searchProfile => {
          this.store.dispatch(new ApplyFilterAction(this.jobSearchProfileService.mapFromRequest(searchProfile.searchFilter)));
          this.router.navigate(['job-search']);
        }),
        map(() => false)
      );
    }

    this.store.dispatch(new InitializeResultListAction());

    return true;
  }

  private extractFilterFromParam(jobSearchFilterParamValue: string): JobSearchFilter {
    if (!jobSearchFilterParamValue) {
      return null;
    }
    return this.jobSearchFilterParameterService.decode(jobSearchFilterParamValue);
  }

}
