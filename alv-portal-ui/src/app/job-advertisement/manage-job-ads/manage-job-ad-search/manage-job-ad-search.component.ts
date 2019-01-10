import { Component, OnInit } from '@angular/core';
import {
  getManagedJobAdResults,
  getManagedJobAdsSearchFilter,
  ManageJobAdsState
} from '../state-management/state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { ApplyFilterAction, LoadNextPageAction } from '../state-management/actions';
import { FilterManagedJobAdsComponent } from './filter-managed-job-ads/filter-managed-job-ads.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-manage-job-ad-search',
  templateUrl: './manage-job-ad-search.component.html',
  styleUrls: ['./manage-job-ad-search.component.scss']
})
export class ManageJobAdSearchComponent implements OnInit {

  jobSearchResults$: Observable<JobAdvertisement[]>;

  form: FormGroup;

  constructor(private store: Store<ManageJobAdsState>,
              private modalService: ModalService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.jobSearchResults$ = this.store.pipe(select(getManagedJobAdResults));
    this.form = this.fb.group({
      query: this.fb.control('')
    });
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

  onFilterClick() {
    const filterModalRef = this.modalService.openMedium(FilterManagedJobAdsComponent);
    const filterComponent = <FilterManagedJobAdsComponent>filterModalRef.componentInstance;
    filterComponent.currentFilters = this.store.pipe(select(getManagedJobAdsSearchFilter));
    filterModalRef.result
      .then(value => {
        this.store.dispatch(new ApplyFilterAction({
          query: this.form.controls['query'].value,
          onlineSinceDays: value.onlineSinceDays
        }));
      })
      .catch(() => {
      });
  }

}
