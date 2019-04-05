import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import {
  Notification,
  NotificationType
} from '../../../shared/layout/notifications/notification.model';
import { LayoutConstants } from '../../../shared/layout/layout-constants.enum';
import { Observable } from 'rxjs';
import { JobDetailModel } from '../job-detail-model';
import {
  JobBadge,
  JobBadgesMapperService
} from '../../../widgets/job-publication-widget/job-badges-mapper.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import {
  isDeactivated,
  isExternal,
  isUnvalidated
} from '../../../widgets/job-search-widget/job-ad-rules';
import { JobDetailModelFactory } from '../job-detail-model-factory';
import { ScrollService } from '../../../core/scroll.service';
import { NotificationsService } from '../../../core/notifications.service';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { ComplaintModalComponent } from '../complaint-modal/complaint-modal.component';


export abstract class AbstractJobAdDetail extends AbstractSubscriber implements OnInit, AfterViewInit {

  protected static readonly ALERTS = {
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

  abstract backButtonPath: string;

  @ViewChild(NgbTooltip)
  clipboardTooltip: NgbTooltip;

  protected static mapJobAdAlerts(job: JobAdvertisement): Notification[] {
    const alerts = [];
    if (isExternal(job)) {
      alerts.push(AbstractJobAdDetail.ALERTS.jobAdExternal);
    }
    if (isDeactivated(job)) {
      alerts.push(AbstractJobAdDetail.ALERTS.jobAdDeactivated);
    }
    if (isUnvalidated(job)) {
      alerts.push(AbstractJobAdDetail.ALERTS.jobAdUnvalidated);
    }
    return alerts;
  }

  protected constructor(
    protected jobBadgesMapperService: JobBadgesMapperService,
    protected jobDetailModelFactory: JobDetailModelFactory,
    private scrollService: ScrollService,
    private notificationsService: NotificationsService,
    private modalService: ModalService) {
    super();
  }

  ngAfterViewInit(): void {
    this.scrollService.scrollToTop();
  }

  abstract ngOnInit();

  abstract prev();

  abstract next();

  getEncodedUrl() {
    return encodeURIComponent(this.getJobUrl());
  }

  printJob() {
    window.print();
  }

  onCopyLink(): void {
    this.notificationsService.add(AbstractJobAdDetail.ALERTS.copiedLinkToClipboard);
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

  protected getJobUrl() {
    return window.location.href;
  }

  makeFavourite() {
    console.log('now favourite');
  }

  removeFavourite() {
    console.log('now not favourite');
  }

  editNote() {
    console.log('note added');
  }
}
