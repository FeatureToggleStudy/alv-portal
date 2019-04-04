import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  getSelectedJobAdvertisement,
  isNextVisible,
  isPrevVisible,
  JobAdFavouritesState,
  LoadNextJobAdvertisementDetailAction,
  LoadPreviousJobAdvertisementDetailAction
} from '../state-management';
import { select, Store } from '@ngrx/store';
import { JobBadgesMapperService } from '../../../widgets/job-publication-widget/job-badges-mapper.service';
import { JobDetailModelFactory } from '../../shared/job-detail-model-factory';
import { map, switchMap } from 'rxjs/operators';
import { ScrollService } from '../../../core/scroll.service';
import { NotificationsService } from '../../../core/notifications.service';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { AbstractJobAdDetail } from '../../shared/abstract-job-ad-detail/abstract-job-ad-detail';

@Component({
  selector: 'alv-job-ad-favourite-detail',
  templateUrl: '../../shared/abstract-job-ad-detail/abstract-job-ad-detail.html',
  styleUrls: ['../../shared/abstract-job-ad-detail/abstract-job-ad-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobAdFavouriteDetailComponent extends AbstractJobAdDetail implements OnInit {

  backButtonPath = '/job-favourites';

  constructor(
    jobBadgesMapperService: JobBadgesMapperService,
    jobDetailModelFactory: JobDetailModelFactory,
    scrollService: ScrollService,
    notificationsService: NotificationsService,
    modalService: ModalService,
    private store: Store<JobAdFavouritesState>) {
    super(jobBadgesMapperService,
      jobDetailModelFactory,
      scrollService,
      notificationsService,
      modalService
    );
  }

  ngOnInit() {
    const job$ = this.store.pipe(select(getSelectedJobAdvertisement));

    this.jobDetailModel$ = job$.pipe(
      switchMap((job) => this.jobDetailModelFactory.create(job))
    );

    this.alerts$ = job$.pipe(map(JobAdFavouriteDetailComponent.mapJobAdAlerts));
    this.badges$ = job$.pipe(map(job => this.jobBadgesMapperService.map(job)));

    this.prevEnabled$ = this.store.pipe(select(isPrevVisible));
    this.nextEnabled$ = this.store.pipe(select(isNextVisible));
  }

  prev() {
    this.store.dispatch(new LoadPreviousJobAdvertisementDetailAction());
  }

  next() {
    this.store.dispatch(new LoadNextJobAdvertisementDetailAction());
  }
}
