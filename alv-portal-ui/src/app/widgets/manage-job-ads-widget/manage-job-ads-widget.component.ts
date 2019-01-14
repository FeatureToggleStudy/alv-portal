import { Component, OnInit } from '@angular/core';
import { JobAdvertisementRepository } from '../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { ManagedJobAdsSearchRequestMapper } from '../../job-advertisement/manage-job-ads/state-management/effects';
import {
  ManagedJobAdsSearchFilter,
  ManagedJobAdsSort,
  SortDirection
} from '../../job-advertisement/manage-job-ads/state-management/state';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import {
  JobAdColumnDefinition,
  JobAdManagementRow2,
  SortChangeEvent
} from './job-ad-management-table/job-ad-management-table.component';
import { JobAdvertisementUtils } from '../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { JobAdManagementColumnService } from './job-ad-management-column.service';


interface ColumnHeader {
  backendKey: ManagedJobAdsSort;
  translationKey: string;
}

@Component({
  selector: 'alv-manage-job-ads-widget',
  templateUrl: './manage-job-ads-widget.component.html',
  styleUrls: ['./manage-job-ads-widget.component.scss']
})
export class ManageJobAdsWidgetComponent extends AbstractSubscriber implements OnInit {

  currentFilter$ = new BehaviorSubject<ManagedJobAdsSearchFilter>({
    ownerUserId: null,
    onlineSinceDays: null,
    query: null,
    sort: {
      direction: SortDirection.ASC,
      column: ManagedJobAdsSort.PUBLICATION_DATE
    }
  });

  rows$: Observable<JobAdManagementRow2[]>;

  columns$: Observable<JobAdColumnDefinition[]>;

  constructor(private jobAdvertisementRepository: JobAdvertisementRepository,
              private jobAdManagementColumnService: JobAdManagementColumnService,
              private authenticationService: AuthenticationService
  ) {
    super();
  }

  ngOnInit() {
    this.rows$ = combineLatest(this.authenticationService.getCurrentCompany(), this.currentFilter$).pipe(
      map(([company, currentFilter]) => {
        return ManagedJobAdsSearchRequestMapper.mapToRequest(currentFilter, 0, company.companyExternalId, 5);
      }),
      switchMap(value => {
        return this.jobAdvertisementRepository.searchManagedJobAds(value);
      }),
      map(jobs => {
        return jobs.result.map(job => ({
          jobAdvertisement: job,
          isCancellable: JobAdvertisementUtils.isJobAdvertisementCancellable(job.status),
          detailRouterLink: ['/manage-job-ads', job.id],
          title: JobAdvertisementUtils.getJobDescription(job).title,
        }));
      }),
    );
    this.columns$ = this.jobAdManagementColumnService.map();
  }

  onSortChange(sortChangeEvent: SortChangeEvent) {
    const result: ManagedJobAdsSearchFilter = {
      ...this.currentFilter$.value,
      sort: sortChangeEvent
    };
    this.currentFilter$.next(result);
  }

}
