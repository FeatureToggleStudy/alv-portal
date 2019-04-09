import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  getSelectedJobAdvertisement,
  isNextVisible,
  isPrevVisible,
  JobAdFavouritesState,
  LoadNextJobAdvertisementDetailAction,
  LoadPreviousJobAdvertisementDetailAction
} from '../state-management';
import {select, Store} from '@ngrx/store';
import {JobBadgesMapperService} from '../../shared/job-badges-mapper.service';
import {JobDetailModelFactory} from '../../shared/job-detail-model-factory';
import {ScrollService} from '../../../core/scroll.service';
import {NotificationsService} from '../../../core/notifications.service';
import {ModalService} from '../../../shared/layout/modal/modal.service';
import {AbstractJobAdDetailComponent} from '../../shared/abstract-job-ad-detail/abstract-job-ad-detail.component';
import {Observable} from 'rxjs';
import {JobAdvertisement} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';

@Component({
  selector: 'alv-job-ad-favourite-detail',
  templateUrl: '../../shared/abstract-job-ad-detail/abstract-job-ad-detail.component.html',
  styleUrls: ['../../shared/abstract-job-ad-detail/abstract-job-ad-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobAdFavouriteDetailComponent extends AbstractJobAdDetailComponent implements OnInit {

  public backButtonPath = '/job-favourites';

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

  isNextVisible(): Observable<boolean> {
    return this.store.pipe(select(isNextVisible));
  }

  isPrevVisible(): Observable<boolean> {
    return this.store.pipe(select(isPrevVisible));
  }

  loadJob$(): Observable<JobAdvertisement> {
    return this.store.pipe(select(getSelectedJobAdvertisement));
  }

  loadNext() {
    this.store.dispatch(new LoadNextJobAdvertisementDetailAction());
  }

  loadPrev() {
    this.store.dispatch(new LoadPreviousJobAdvertisementDetailAction());
  }

}
