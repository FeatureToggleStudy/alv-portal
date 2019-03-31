import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { Observable } from 'rxjs';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import {
  getSelectedJobAdvertisement,
  isNextVisible,
  isPrevVisible,
  JobAdSearchState,
  LoadNextJobAdvertisementDetailAction,
  LoadPreviousJobAdvertisementDetailAction
} from '../state-management';
import { select, Store } from '@ngrx/store';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import {
  JobBadge,
  JobBadgesMapperService
} from '../../../widgets/job-publication-widget/job-badges-mapper.service';
import {
  Notification,
  NotificationType
} from '../../../shared/layout/notifications/notification.model';
import { JobDetailModelFactory } from '../../shared/job-detail-model-factory';
import { JobDetailModel } from '../../shared/job-detail-model';
import { map, switchMap } from 'rxjs/operators';
import { isDeactivated, isExternal, isUnvalidated } from '../../shared/job-ad-rules';
import { ScrollService } from '../../../core/scroll.service';
import { LayoutConstants } from '../../../shared/layout/layout-constants.enum';
import { NotificationsService } from '../../../core/notifications.service';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { ComplaintModalComponent } from './complaint-modal/complaint-modal.component';

@Component({
  selector: 'alv-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobDetailComponent extends AbstractSubscriber implements OnInit, AfterViewInit {

  private static readonly ALERTS = {
    jobAdExternal: {
      type: NotificationType.INFO,
      messageKey: 'job-detail.external-job-disclaimer',
      isSticky: true
    },
    jobAdDeactivated: {
      type: NotificationType.WARNING,
      messageKey: 'job-detail.deactivated',
      isSticky: true
    },
    jobAdUnvalidated: {
      type: NotificationType.INFO,
      messageKey: 'job-detail.unvalidated',
      isSticky: true
    },
    copiedLinkToClipboard: {
      type: NotificationType.SUCCESS,
      messageKey: 'global.messages.tooltip.link-copy.success',
      isSticky: false
    }
  };

  layoutConstants = LayoutConstants;

  jobDetailModel$: Observable<JobDetailModel>;

  prevEnabled$: Observable<boolean>;

  nextEnabled$: Observable<boolean>;

  badges$: Observable<JobBadge[]>;

  alerts$: Observable<Notification[]>;

  @ViewChild(NgbTooltip)
  clipboardTooltip: NgbTooltip;

  private static mapJobAdAlerts(job: JobAdvertisement): Notification[] {
    const alerts = [];
    if (isExternal(job)) {
      alerts.push(JobDetailComponent.ALERTS.jobAdExternal);
    }
    if (isDeactivated(job)) {
      alerts.push(JobDetailComponent.ALERTS.jobAdDeactivated);
    }
    if (isUnvalidated(job)) {
      alerts.push(JobDetailComponent.ALERTS.jobAdUnvalidated);
    }
    return alerts;
  }

  constructor(
    private jobBadgesMapperService: JobBadgesMapperService,
    private jobDetailModelFactory: JobDetailModelFactory,
    private store: Store<JobAdSearchState>,
    private scrollService: ScrollService,
    private notificationsService: NotificationsService,
    private modalService: ModalService) {
    super();
  }

  ngAfterViewInit(): void {
    this.scrollService.scrollToTop();
  }

  ngOnInit() {
    const job$ = this.store.pipe(select(getSelectedJobAdvertisement));

    this.jobDetailModel$ = job$.pipe(
      switchMap((job) => this.jobDetailModelFactory.create(job))
    );

    this.alerts$ = job$.pipe(map(JobDetailComponent.mapJobAdAlerts));
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

  getEncodedUrl() {
    return encodeURIComponent(this.getJobUrl());
  }

  printJob() {
    window.print();
  }

  onCopyLink(): void {
    this.notificationsService.add(JobDetailComponent.ALERTS.copiedLinkToClipboard);
  }

  dismissAlert(alert: Notification, alerts: Notification[]) {
    alerts.splice(alerts.indexOf(alert), 1);
  }

  openComplaintModal(jobAdvertisementId: string) {
    const complaintModalRef = this.modalService.openLarge(ComplaintModalComponent);
    const complaintModalComponent = <ComplaintModalComponent>complaintModalRef.componentInstance;
    complaintModalComponent.jobAdvertisementId = jobAdvertisementId;
    complaintModalRef.result
      .then(() => {
        this.notificationsService.success('job-detail.complaint-modal.message.success', false);
      })
      .catch(() => {
      });
  }

  private getJobUrl() {
    return window.location.href;
  }

}
