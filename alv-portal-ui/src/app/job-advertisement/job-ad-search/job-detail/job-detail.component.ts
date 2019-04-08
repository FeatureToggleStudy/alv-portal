import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  getSelectedJobAdvertisement,
  isNextVisible,
  isPrevVisible,
  JobAdSearchState,
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
  selector: 'alv-job-detail',
  templateUrl: '../../shared/abstract-job-ad-detail/abstract-job-ad-detail.component.html',
  styleUrls: ['../../shared/abstract-job-ad-detail/abstract-job-ad-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobDetailComponent extends AbstractJobAdDetailComponent implements OnInit {

  backButtonPath = '/job-search';

  constructor(
    jobBadgesMapperService: JobBadgesMapperService,
    jobDetailModelFactory: JobDetailModelFactory,
    scrollService: ScrollService,
    notificationsService: NotificationsService,
    modalService: ModalService,
    private store: Store<JobAdSearchState>) {
    super(
      jobBadgesMapperService,
      jobDetailModelFactory,
      scrollService,
      notificationsService,
      modalService
    );
  }

  loadPrev() {
    this.store.dispatch(new LoadPreviousJobAdvertisementDetailAction());
  }

  loadNext() {
    this.store.dispatch(new LoadNextJobAdvertisementDetailAction());
  }

  loadJob$(): Observable<JobAdvertisement> {
    return this.store.pipe(select(getSelectedJobAdvertisement));
  }

  isNextVisible(): Observable<boolean> {
    return this.store.pipe(select(isNextVisible));
  }

  isPrevVisible(): Observable<boolean> {
    return this.store.pipe(select(isPrevVisible));
  }

}
