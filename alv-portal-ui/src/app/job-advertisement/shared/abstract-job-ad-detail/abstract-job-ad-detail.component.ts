import {AfterViewInit, OnInit, ViewChild} from '@angular/core';
import {AbstractSubscriber} from '../../../core/abstract-subscriber';
import {Notification, NotificationType} from '../../../shared/layout/notifications/notification.model';
import {LayoutConstants} from '../../../shared/layout/layout-constants.enum';
import {Observable} from 'rxjs';
import {JobDetailModel} from '../job-detail-model';
import {JobBadge, JobBadgesMapperService} from '../job-badges-mapper.service';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {JobAdvertisement} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import {isDeactivated, isExternal, isUnvalidated} from '../../../widgets/job-search-widget/job-ad-rules';
import {JobDetailModelFactory} from '../job-detail-model-factory';
import {ScrollService} from '../../../core/scroll.service';
import {NotificationsService} from '../../../core/notifications.service';
import {ModalService} from '../../../shared/layout/modal/modal.service';
import {ComplaintModalComponent} from '../complaint-modal/complaint-modal.component';
import {filter, map, switchMap} from 'rxjs/operators';

export abstract class AbstractJobAdDetailComponent extends AbstractSubscriber implements OnInit, AfterViewInit {

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

  @ViewChild(NgbTooltip)
  clipboardTooltip: NgbTooltip;

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

  ngOnInit() {
    const job$ = this.loadJob$().pipe(
      filter(job => !!job)
    );
    this.jobDetailModel$ = job$.pipe(
      switchMap((job) => this.jobDetailModelFactory.create(job))
    );
    this.alerts$ = job$.pipe(map(this.mapJobAdAlerts));
    this.badges$ = job$.pipe(map(job => this.jobBadgesMapperService.map(job)));
    this.prevEnabled$ = this.isPrevVisible();
    this.nextEnabled$ = this.isNextVisible();
  }

  abstract loadJob$(): Observable<JobAdvertisement>;

  abstract loadPrev();

  abstract loadNext();

  abstract isPrevVisible(): Observable<boolean>;

  abstract isNextVisible(): Observable<boolean>;

  abstract get backButtonPath();

  getEncodedUrl() {
    return encodeURIComponent(this.getJobUrl());
  }

  printJob() {
    window.print();
  }

  onCopyLink(): void {
    this.notificationsService.add(AbstractJobAdDetailComponent.ALERTS.copiedLinkToClipboard);
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

  private mapJobAdAlerts(job: JobAdvertisement): Notification[] {
    const alerts = [];
    if (isExternal(job)) {
      alerts.push(AbstractJobAdDetailComponent.ALERTS.jobAdExternal);
    }
    if (isDeactivated(job)) {
      alerts.push(AbstractJobAdDetailComponent.ALERTS.jobAdDeactivated);
    }
    if (isUnvalidated(job)) {
      alerts.push(AbstractJobAdDetailComponent.ALERTS.jobAdUnvalidated);
    }
    return alerts;
  }

  addToFavourites() {
    console.log('add');
  }


  removeFromFavourites() {
    console.log('add');
  }

  editNote() {
    console.log('note added');
  }
}
