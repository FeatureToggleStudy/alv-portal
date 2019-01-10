import { Component, OnInit } from '@angular/core';
import { JobBadge, JobBadgesMapperService } from '../../shared/job-badges-mapper.service';
import { JobDetailModelFactory } from '../../shared/job-detail-model-factory';
import { select, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JobDetailModel } from '../../shared/job-detail-model';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import {
  getSelectedJobAdvertisement,
  ManageJobAdsState
} from '../state-management/state';

@Component({
  selector: 'alv-manage-job-ad-detail',
  templateUrl: './manage-job-ad-detail.component.html',
  styleUrls: ['./manage-job-ad-detail.component.scss']
})
export class ManageJobAdDetailComponent extends AbstractSubscriber implements OnInit {

  private jobDetailModel$: Observable<JobDetailModel>;

  private badges$: Observable<JobBadge[]>;

  constructor(private jobBadgesMapperService: JobBadgesMapperService,
              private jobDetailModelFactory: JobDetailModelFactory,
              private store: Store<ManageJobAdsState>) {
    super();
  }

  ngOnInit() {
    const job$ = this.store.pipe(select(getSelectedJobAdvertisement));
    this.jobDetailModel$ = job$.pipe(
      switchMap((job) => this.jobDetailModelFactory.create(job))
    );

    this.badges$ = job$.pipe(map(job => this.jobBadgesMapperService.map(job)));
  }

}
