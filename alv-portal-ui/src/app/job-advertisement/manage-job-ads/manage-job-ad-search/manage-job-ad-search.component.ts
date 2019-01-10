import { Component, OnInit } from '@angular/core';
import {
  getManagedJobAdResults,
  LoadNextPageAction,
  ManageJobAdsState
} from '../state-management';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';

@Component({
  selector: 'alv-manage-job-ad-search',
  templateUrl: './manage-job-ad-search.component.html',
  styleUrls: ['./manage-job-ad-search.component.scss']
})
export class ManageJobAdSearchComponent implements OnInit {

  jobSearchResults$: Observable<JobAdvertisement[]>;

  constructor(private store: Store<ManageJobAdsState>) {
  }

  ngOnInit() {
    this.jobSearchResults$ = this.store.pipe(select(getManagedJobAdResults));
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

}
