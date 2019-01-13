import { Component, OnInit } from '@angular/core';
import {
  getManagedJobAdResults,
  getManagedJobAdsSearchFilter,
  ManagedJobAdsSearchFilter,
  ManageJobAdsState,
  MangedJobAdsSort,
  SortDirection
} from '../state-management/state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { ApplyFilterAction, LoadNextPageAction } from '../state-management/actions';
import { FilterManagedJobAdsComponent } from './filter-managed-job-ads/filter-managed-job-ads.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManagedJobAdSearchFilterValues } from './managed-job-ad-search-types';
import { take } from 'rxjs/operators';

@Component({
  selector: 'alv-manage-job-ad-search',
  templateUrl: './manage-job-ad-search.component.html',
  styleUrls: ['./manage-job-ad-search.component.scss']
})
export class ManageJobAdSearchComponent implements OnInit {

  jobSearchResults$: Observable<JobAdvertisement[]>;

  filtersInStore: Observable<ManagedJobAdsSearchFilter>;

  form: FormGroup;

  MangedJobAdsSort = MangedJobAdsSort;

  SortDirection = SortDirection;

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
        this.applyFilter(value);
      })
      .catch(() => {
      });
  }

  onQueryChange($event) {
    this.applyQuery($event.target.value);
  }

  onSortChange(selectedColumn: MangedJobAdsSort, current: { column: MangedJobAdsSort; direction: SortDirection }) {
    const direction = this.determineSortDirection(selectedColumn, current);
    this.applySort({ column: selectedColumn, direction: direction });
  }

  private determineSortDirection(selectedColumn: MangedJobAdsSort, current: { column: MangedJobAdsSort; direction: SortDirection }) {
    if (selectedColumn !== current.column) {
      return SortDirection.ASC;
    }
    return current.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
  }

  private applyFilter(newFilter: ManagedJobAdSearchFilterValues) {
    this.filtersInStore.pipe(take(1)).subscribe(value => {
      this.store.dispatch(new ApplyFilterAction({
        ...value,
        onlineSinceDays: newFilter.onlineSinceDays
      }));
    });
  }

  private applyQuery(newQuery: string) {
    this.filtersInStore.pipe(take(1)).subscribe(value => {
      this.store.dispatch(new ApplyFilterAction({
        ...value,
        query: newQuery
      }));
    });
  }

  private applySort(newSort: { column: MangedJobAdsSort; direction: SortDirection }) {
    this.filtersInStore.pipe(take(1)).subscribe(value => {
      this.store.dispatch(new ApplyFilterAction({
        ...value,
        sort: newSort
      }));
    });
  }
}
