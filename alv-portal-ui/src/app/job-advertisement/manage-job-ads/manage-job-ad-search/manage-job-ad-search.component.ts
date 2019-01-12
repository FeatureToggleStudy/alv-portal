import { Component, OnInit } from '@angular/core';
import {
  getManagedJobAdResults,
  getManagedJobAdsSearchFilter,
  ManagedJobAdsSearchFilter,
  ManageJobAdsState
} from '../state-management/state';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { ApplyFilterAction, LoadNextPageAction } from '../state-management/actions';
import { FilterManagedJobAdsComponent } from './filter-managed-job-ads/filter-managed-job-ads.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { InlineBadge } from '../../../shared/layout/inline-badges/inline-badge.types';

@Component({
  selector: 'alv-manage-job-ad-search',
  templateUrl: './manage-job-ad-search.component.html',
  styleUrls: ['./manage-job-ad-search.component.scss']
})
export class ManageJobAdSearchComponent implements OnInit {

  jobSearchResults$: Observable<JobAdvertisement[]>;
  filterInStore$: Observable<ManagedJobAdsSearchFilter>;

  filtersChanged$: BehaviorSubject<ManagedJobAdsSearchFilter>;
  queryChanged$: BehaviorSubject<string>;

  currentBadges$: Observable<InlineBadge[]>;

  form: FormGroup;

  constructor(private store: Store<ManageJobAdsState>,
              private modalService: ModalService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.jobSearchResults$ = this.store.pipe(select(getManagedJobAdResults));
    this.filterInStore$ = this.store.pipe(select(getManagedJobAdsSearchFilter));

    this.currentBadges$ = this.filterInStore$.pipe(
      map(filter => {
          const badges = [];
          for (const key in filter) {
            if (key === 'onlineSinceDays') {
              badges.push({
                label: 'dashboard.job-publication.publication-period.' + (filter[key] ? filter[key] : 'all'),
                cssClass: 'badge-manage-jobads-filter'
              });
            } else if (key === 'ownerUserId') {
              badges.push({
                label: 'dashboard.job-publication.createdBy.' + (filter[key] ? 'me' : 'all'),
                cssClass: 'badge-manage-jobads-filter'
              });
            }
          }

          return badges;
        }
      )
    );

    this.form = this.fb.group({
      query: ['']
    });

    this.filtersChanged$ = new BehaviorSubject<ManagedJobAdsSearchFilter>({
      onlineSinceDays: null,
      query: '',
      ownerUserId: ''
    });

    this.queryChanged$ = new BehaviorSubject<string>('');

    combineLatest(this.filtersChanged$, this.queryChanged$).pipe(
      map(([filters, query]) => {
        debugger;
        return {
          onlineSinceDays: filters.onlineSinceDays,
          query: query,
          ownerUserId: filters.ownerUserId
        } as ManagedJobAdsSearchFilter;
      }),
      tap(filter => {
        return this.store.dispatch(new ApplyFilterAction(filter));
      })
    )
      .subscribe();

  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

  removeCurrentBadge(badge: InlineBadge) {
    // todo implement (or better not)
  }

  onFilterClick() {
    const filterModalRef = this.modalService.openMedium(FilterManagedJobAdsComponent);
    const filterComponent = <FilterManagedJobAdsComponent>filterModalRef.componentInstance;

    filterComponent.currentFiltering$ = this.filterInStore$;

    filterModalRef.result
      .then(value => {
        this.filtersChanged$.next(value);
      })
      .catch(() => {
      });
  }

  onQueryChange($event) {
    this.queryChanged$.next($event.target.value);
  }

}
