import { Component, OnInit } from '@angular/core';
import { getManagedJobAdResults, ManageJobAdsState } from '../state-management/state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { LoadNextPageAction } from '../state-management/actions';
import { FilterManagedJobAdsComponent } from './filter-managed-job-ads/filter-managed-job-ads.component';

@Component({
  selector: 'alv-manage-job-ad-search',
  templateUrl: './manage-job-ad-search.component.html',
  styleUrls: ['./manage-job-ad-search.component.scss']
})
export class ManageJobAdSearchComponent implements OnInit {

  jobSearchResults$: Observable<JobAdvertisement[]>;

  constructor(private store: Store<ManageJobAdsState>,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.jobSearchResults$ = this.store.pipe(select(getManagedJobAdResults));
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

  onFilterClick() {
    const filterModalRef = this.modalService.openMedium(FilterManagedJobAdsComponent);
    const filterComponent = <FilterManagedJobAdsComponent>filterModalRef.componentInstance;


  }

}
