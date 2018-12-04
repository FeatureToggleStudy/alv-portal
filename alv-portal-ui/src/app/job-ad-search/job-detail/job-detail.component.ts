import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  getCurrentJobAd, isNextVisible, isPrevVisible,
  JobAdSearchState
} from '../state-management/state/job-ad-search.state';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/index';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.model';
import {
  LoadJobAdvertisementDetailAction,
  LoadNextJobAdvertisementDetailAction, LoadPreviousJobAdvertisementDetailAction
} from '../state-management/actions/job-ad-search.actions';
import { AuthenticationService } from '../../core/auth/authentication.service';

@Component({
  selector: 'alv-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  currentJobAd$: Observable<JobAdvertisement>;
  prevVisible$: Observable<boolean>;
  nextVisible$: Observable<boolean>;

  constructor(private store: Store<JobAdSearchState>) {

    this.currentJobAd$ = this.store.pipe(select(getCurrentJobAd));
    this.prevVisible$ = this.store.pipe(select(isPrevVisible));
    this.nextVisible$ = this.store.pipe(select(isNextVisible));

  }

  ngOnInit() {
  }

  prev() {
    this.store.dispatch(new LoadPreviousJobAdvertisementDetailAction());
  }

  next() {
    this.store.dispatch(new LoadNextJobAdvertisementDetailAction());
  }

}
