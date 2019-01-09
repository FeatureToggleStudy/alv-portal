import { Component, OnInit } from '@angular/core';
import { getManagedJobAdResults, ManageJobAdsState } from '../state-management/state';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobAdManagementRow } from './job-ad-management-row/job-ad-management-row';
import { I18nService } from '../../core/i18n.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'alv-manage-job-ad-search',
  templateUrl: './manage-job-ad-search.component.html',
  styleUrls: ['./manage-job-ad-search.component.scss']
})
export class ManageJobAdSearchComponent implements OnInit {

  private jobSearchResults$: Observable<JobAdvertisement[]>;

  jobAdManagementRows$: Observable<JobAdManagementRow[]>;

  constructor(private store: Store<ManageJobAdsState>,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.jobSearchResults$ = this.store.pipe(select(getManagedJobAdResults));
    this.jobAdManagementRows$ = combineLatest(this.jobSearchResults$, this.i18nService.currentLanguage$).pipe(
      map(([jobSearchResults, currentLanguage]) =>
        jobSearchResults.map(jobSearchResult =>
          new JobAdManagementRow(jobSearchResult, currentLanguage)
        )
      )
    );
  }

}
