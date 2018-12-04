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
  LoadCurrentAction,
  LoadNextAction, LoadPrevAction
} from '../state-management/actions/job-ad-search.actions';

@Component({
  selector: 'alv-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  currentJobAd$: Observable<JobAdvertisement>;
  prevVisible$: Observable<boolean>;
  nextVisible$: Observable<boolean>;

  constructor(private store: Store<JobAdSearchState>,
              private activatedRoute: ActivatedRoute) {
    const id = this.activatedRoute.snapshot.params['id'];

    this.store.dispatch(new LoadCurrentAction({ id }));

    this.currentJobAd$ = this.store.pipe(select(getCurrentJobAd));
    this.prevVisible$ = this.store.pipe(select(isPrevVisible));
    this.nextVisible$ = this.store.pipe(select(isNextVisible));
  }

  ngOnInit() {
  }

  prev() {
    this.store.dispatch(new LoadPrevAction());
  }

  next() {
    this.store.dispatch(new LoadNextAction());
  }

}
