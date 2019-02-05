import { Component, OnInit } from '@angular/core';
import { JobAdvertisementRepository } from '../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { ManagedJobAdsSearchRequestMapper } from './managed-job-ads-search-request.mapper';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { JobAdvertisementUtils } from '../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { JobAdManagementColumnService } from './job-ad-management-column.service';
import {
  ManagedJobAdColumnDefinition,
  ManagedJobAdRow,
  ManagedJobAdsAction,
  ManagedJobAdsActionType,
  ManagedJobAdsSearchFilter,
  ManagedJobAdsSorting,
  ManagedJobAdsSortingColumn,
  SortDirection
} from './job-ad-management-table/job-ad-management.table-types';
import { JobAdCancellationComponent } from './job-ad-cancellation/job-ad-cancellation.component';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { Router } from '@angular/router';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { Store } from '@ngrx/store';
import { CoreState } from '../../core/state-management/state/core.state.ts';
import { JobAdvertisementUpdatedAction } from '../../core/state-management/actions/core.actions';
import { IconKey } from '../../shared/layout/custom-icon/custom-icon.component';

@Component({
  selector: 'alv-manage-job-ads-widget',
  templateUrl: './manage-job-ads-widget.component.html',
  styleUrls: ['./manage-job-ads-widget.component.scss']
})
export class ManageJobAdsWidgetComponent extends AbstractSubscriber implements OnInit {

  IconKey = IconKey;

  currentFilter$ = new BehaviorSubject<ManagedJobAdsSearchFilter>({
    ownerUserId: null,
    onlineSinceDays: null,
    query: null,
    status: null,
    sort: {
      direction: SortDirection.DESC,
      column: ManagedJobAdsSortingColumn.PUBLICATION_DATE
    }
  });

  rows$: Observable<ManagedJobAdRow[]>;

  columns$: Observable<ManagedJobAdColumnDefinition[]>;

  isLoading = false;

  constructor(private jobAdvertisementRepository: JobAdvertisementRepository,
              private modalService: ModalService,
              private router: Router,
              private store: Store<CoreState>,
              private jobAdManagementColumnService: JobAdManagementColumnService,
              private authenticationService: AuthenticationService
  ) {
    super();
  }

  ngOnInit() {
    this.rows$ = combineLatest(this.authenticationService.getCurrentCompany(), this.currentFilter$).pipe(
      tap(() => this.isLoading = true),
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
      tap(() => this.isLoading = false),
      catchError(err => {
        this.isLoading = false;
        return throwError(err);
      })
    );
    this.columns$ = this.jobAdManagementColumnService.createColumnDefinitions(
      [
        ManagedJobAdsSortingColumn.PUBLICATION_DATE,
        ManagedJobAdsSortingColumn.TITLE,
        ManagedJobAdsSortingColumn.STATUS,
        ManagedJobAdsSortingColumn.OWNER_NAME
      ]
    );
  }

  onSortChange(sortChangeEvent: ManagedJobAdsSorting) {
    const newFilter: ManagedJobAdsSearchFilter = {
      ...this.currentFilter$.value,
      sort: sortChangeEvent
    };
    this.currentFilter$.next(newFilter);
  }

  onAction(action: ManagedJobAdsAction) {
    switch (action.type) {
      case ManagedJobAdsActionType.ON_CANCEL:
        const jobAdCancellationModalRef = this.modalService.openLarge(JobAdCancellationComponent);
        const jobAdCancellationComponent = <JobAdCancellationComponent>jobAdCancellationModalRef.componentInstance;
        jobAdCancellationComponent.jobAdvertisement = action.row.jobAdvertisement;
        jobAdCancellationComponent.accessToken = null;
        jobAdCancellationModalRef.result
          .then((jobAdvertisement: JobAdvertisement) => {
            this.currentFilter$.next(this.currentFilter$.value);
            this.store.dispatch(new JobAdvertisementUpdatedAction({ jobAdvertisement: jobAdvertisement }));
          })
          .catch(() => {
          });
        break;
      case ManagedJobAdsActionType.ON_OPEN:
        this.router.navigate(action.row.detailRouterLink);
        break;
      case ManagedJobAdsActionType.ON_DUPLICATE:
        this.router.navigate(['job-publication'], {
          queryParams: {
            'job-ad-id': action.row.jobAdvertisement.id
          }
        });
        break;
    }
  }

  showAll() {
    this.router.navigate(['/manage-job-ads']);
  }

}
