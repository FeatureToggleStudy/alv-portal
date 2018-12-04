import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  getSelectedJobAdvertisement,
  isNextVisible,
  isPrevVisible,
  JobAdSearchState
} from '../state-management/state/job-ad-search.state';
import { Observable } from 'rxjs/index';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.model';
import {
  LoadNextJobAdvertisementDetailAction,
  LoadPreviousJobAdvertisementDetailAction
} from '../state-management/actions/job-ad-search.actions';
import { AbstractSubscriber } from '../../core/abstract-subscriber';

@Component({
  selector: 'alv-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent extends AbstractSubscriber implements OnInit {

  jobAdvertisement$: Observable<JobAdvertisement>;

  prevVisible$: Observable<boolean>;

  nextVisible$: Observable<boolean>;

  constructor(private store: Store<JobAdSearchState>) {
    super();
    this.jobAdvertisement$ = this.store.pipe(select(getSelectedJobAdvertisement));
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
