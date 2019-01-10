import { Component, OnInit } from '@angular/core';
import { getManagedJobAdResults, ManageJobAdsState } from '../state-management/state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { LoadNextPageAction } from '../../candidate-search/state-management/actions';

@Component({
  selector: 'alv-manage-job-ad-search',
  templateUrl: './manage-job-ad-search.component.html',
  styleUrls: ['./manage-job-ad-search.component.scss']
})
export class ManageJobAdSearchComponent implements OnInit {

  private jobSearchResults$: Observable<JobAdvertisement[]>;

  constructor(private store: Store<ManageJobAdsState>) {
  }

  ngOnInit() {
    this.jobSearchResults$ = this.store.pipe(select(getManagedJobAdResults));
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

}
