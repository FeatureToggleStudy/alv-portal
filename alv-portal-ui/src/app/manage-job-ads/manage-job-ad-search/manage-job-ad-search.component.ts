import { Component, OnInit } from '@angular/core';
import {
  getManagedJobAdResults,
  getManagedJobAdsSearchFilter, ManagedJobAdsSearchFilter,
  ManageJobAdsState
} from '../state-management/state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobAdManagementRow } from './job-ad-management-row/job-ad-management-row';
import { I18nService } from '../../core/i18n.service';
import { map, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'alv-manage-job-ad-search',
  templateUrl: './manage-job-ad-search.component.html',
  styleUrls: ['./manage-job-ad-search.component.scss']
})
export class ManageJobAdSearchComponent implements OnInit {

  private jobSearchResults$: Observable<JobAdvertisement[]>;

  jobAdManagementRows$: Observable<JobAdManagementRow[]>;

  appliedFilters$: Observable<ManagedJobAdsSearchFilter>;

  currentLanguage: Observable<string>;


  constructor(private store: Store<ManageJobAdsState>,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.currentLanguage = this.i18nService.currentLanguage$;
    this.jobSearchResults$ = this.store.pipe(select(getManagedJobAdResults));
    this.appliedFilters$ = this.store.pipe(select(getManagedJobAdsSearchFilter));
    this.jobAdManagementRows$ = this.jobSearchResults$.pipe(
      withLatestFrom(this.currentLanguage),
      map(([jobSearchResults, currentLanguage]) =>
        jobSearchResults.map(jobSearchResult =>
          new JobAdManagementRow(jobSearchResult, currentLanguage)
        )
      )
    )
  }

}
