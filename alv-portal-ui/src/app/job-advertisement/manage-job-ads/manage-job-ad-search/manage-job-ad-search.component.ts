import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import {
  ApplyFilterAction,
  JobAdvertisementCancelledAction,
  LoadNextPageAction
} from '../state-management/actions';
import { FilterManagedJobAdsComponent } from './filter-managed-job-ads/filter-managed-job-ads.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, map, take, takeUntil, tap } from 'rxjs/operators';
import { InlineBadge } from '../../../shared/layout/inline-badges/inline-badge.types';
import { ManagedJobAdSearchFilterValues } from './managed-job-ad-search-types';
import { JobAdManagementColumnService } from '../../../widgets/manage-job-ads-widget/job-ad-management-column.service';
import { JobAdvertisementUtils } from '../../../shared/backend-services/job-advertisement/job-advertisement.utils';
import {
  ManagedJobAdColumnDefinition,
  ManagedJobAdRow,
  ManagedJobAdsAction,
  ManagedJobAdsActionType,
  ManagedJobAdsSearchFilter,
  ManagedJobAdsSorting
} from '../../../widgets/manage-job-ads-widget/job-ad-management-table/job-ad-management.table-types';
import {
  getManagedJobAdResults,
  getManagedJobAdsSearchFilter,
  ManageJobAdsState
} from '../state-management/state';
import { JobAdCancellationComponent } from '../../../widgets/manage-job-ads-widget/job-ad-cancellation/job-ad-cancellation.component';
import { Router } from '@angular/router';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { IconKey } from '../../../shared/icons/custom-icon/custom-icon.component';

interface FilterBadge extends InlineBadge {
  key: string; // is needed to identify the filter that corresponds to a badge
}


@Component({
  selector: 'alv-manage-job-ad-search',
  templateUrl: './manage-job-ad-search.component.html',
  styleUrls: ['./manage-job-ad-search.component.scss']
})
export class ManageJobAdSearchComponent extends AbstractSubscriber implements OnInit {

  IconKey = IconKey;

  currentFilter$: Observable<ManagedJobAdsSearchFilter>;

  form: FormGroup;

  currentBadges$: Observable<FilterBadge[]>;

  rows$: Observable<ManagedJobAdRow[]>;

  columns$: Observable<ManagedJobAdColumnDefinition[]>;

  constructor(private store: Store<ManageJobAdsState>,
              private modalService: ModalService,
              private jobAdManagementColumnService: JobAdManagementColumnService,
              private fb: FormBuilder,
              private router: Router) {
    super();
  }

  private static mapBadges(filter: ManagedJobAdsSearchFilter): FilterBadge[] {
    let badges: FilterBadge[] = [];
    for (const key in filter) {
      if (key === 'onlineSinceDays' && filter[key]) {
        badges.push({
          label: 'dashboard.job-publication.publication-period.' + filter[key],
          cssClass: 'badge-manage-jobads-filter badge-big',
          key: key
        });
      } else if (key === 'ownerUserId' && filter[key]) {
        badges.push({
          label: 'portal.manage-job-ads.search.filter.createdBy.myself',
          cssClass: 'badge-manage-jobads-filter badge-big',
          key: key
        });
      } else if (key === 'status' && filter [key]) {
        badges.push({
          label: 'global.job-publication.status.' + filter[key],
          cssClass: 'badge-manage-jobads-filter badge-big',
          key: key
        });
      } else if (!filter[key]) {
        badges = badges.filter(badge => badge.key);
      }
    }

    return badges;
  }

  ngOnInit() {

    this.columns$ = this.jobAdManagementColumnService.createColumnDefinitions();

    this.rows$ = this.store.pipe(
      select(getManagedJobAdResults),
      map(jobs => {
        return jobs.map(job => ({
          jobAdvertisement: job,
          isCancellable: JobAdvertisementUtils.isJobAdvertisementCancellable(job.status),
          detailRouterLink: ['/manage-job-ads', job.id],
          title: JobAdvertisementUtils.getJobDescription(job).title,
        }));
      })
    );

    this.form = this.fb.group({
      query: [null]
    });

    this.currentFilter$ = this.store.pipe(select(getManagedJobAdsSearchFilter)).pipe(
      tap(currentFilter => {
        this.form.patchValue({ query: currentFilter.query }, { emitEvent: false });
      })
    );

    this.form.get('query').valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.applyQuery(value));

    this.currentBadges$ = this.currentFilter$.pipe(
      map(ManageJobAdSearchComponent.mapBadges)
    );
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

  removeCurrentBadge(badge: FilterBadge) {
    this.currentFilter$.pipe(
      take(1))
      .subscribe(currentFilter => {
        const newFilter = { ...currentFilter };
        newFilter[badge.key] = null;
        this.store.dispatch(new ApplyFilterAction(newFilter));
      });
  }

  onFilterClick() {
    this.currentFilter$.pipe(take(1))
      .subscribe(currentFilter => {
        const filterModalRef = this.modalService.openMedium(FilterManagedJobAdsComponent);
        const filterComponent = <FilterManagedJobAdsComponent>filterModalRef.componentInstance;
        filterComponent.currentFiltering = currentFilter;
        filterModalRef.result
          .then(newFilter => {
            this.applyFilter(newFilter);
          })
          .catch(() => {
          });
      });
  }

  onSortChange(sortChangeEvent: ManagedJobAdsSorting) {
    this.applySort(sortChangeEvent);
  }

  onAction(action: ManagedJobAdsAction) {
    switch (action.type) {
      case ManagedJobAdsActionType.ON_CANCEL:
        const jobAdCancellationModalRef = this.modalService.openLarge(JobAdCancellationComponent);
        const jobAdCancellationComponent = <JobAdCancellationComponent>jobAdCancellationModalRef.componentInstance;
        jobAdCancellationComponent.jobAdvertisement = action.row.jobAdvertisement;
        jobAdCancellationComponent.accessToken = null;
        jobAdCancellationModalRef.result
          .then((job) => {
            this.store.dispatch(new JobAdvertisementCancelledAction({ jobAdvertisement: job }));
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

  private applyFilter(newFilter: ManagedJobAdSearchFilterValues) {
    this.currentFilter$.pipe(
      take(1))
      .subscribe(value => {
        this.store.dispatch(new ApplyFilterAction({
          ...value,
          onlineSinceDays: newFilter.onlineSinceDays,
          ownerUserId: newFilter.ownerUserId,
          status: newFilter.status
        }));
      });
  }

  private applyQuery(newQuery: string) {
    this.currentFilter$.pipe(
      take(1))
      .subscribe(value => {
        this.store.dispatch(new ApplyFilterAction({
          ...value,
          query: newQuery
        }));
      });
  }

  private applySort(newSort: ManagedJobAdsSorting) {
    this.currentFilter$.pipe(
      take(1))
      .subscribe(value => {
        this.store.dispatch(new ApplyFilterAction({
          ...value,
          sort: newSort
        }));
      });
  }
}
