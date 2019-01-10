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

@Component({
  selector: 'alv-manage-job-ad-search',
  templateUrl: './manage-job-ad-search.component.html',
  styleUrls: ['./manage-job-ad-search.component.scss']
})
export class ManageJobAdSearchComponent implements OnInit {

  jobSearchResults$: Observable<JobAdvertisement[]>;
  filtersInStore: Observable<ManagedJobAdsSearchFilter>;

  filtersChanged$: BehaviorSubject<ManagedJobAdsSearchFilter>;
  queryChanged$: BehaviorSubject<string>;

  form: FormGroup;

  constructor(private store: Store<ManageJobAdsState>,
              private modalService: ModalService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.jobSearchResults$ = this.store.pipe(select(getManagedJobAdResults));
    this.filtersInStore = this.store.pipe(select(getManagedJobAdsSearchFilter));

    this.form = this.fb.group({
      query: ['']
    });

    this.filtersChanged$ = new BehaviorSubject<ManagedJobAdsSearchFilter>({
      onlineSinceDays: null,
      query: ''
    });

    this.queryChanged$ = new BehaviorSubject<string>('');

    combineLatest(this.filtersChanged$, this.queryChanged$).pipe(
      map(([filters, query]) => {
        return {
          onlineSinceDays: filters.onlineSinceDays,
          query: query,
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

  onFilterClick() {
    const filterModalRef = this.modalService.openMedium(FilterManagedJobAdsComponent);
    const filterComponent = <FilterManagedJobAdsComponent>filterModalRef.componentInstance;

    filterComponent.currentFiltering = this.filtersInStore;

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
