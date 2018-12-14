import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  JobAdvertisement,
  JobAdvertisementStatus,
  SourceSystem
} from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { Observable } from 'rxjs';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import {
  getSelectedJobAdvertisement,
  isNextVisible,
  isPrevVisible,
  JobAdSearchState
} from '../state-management/state/job-ad-search.state';
import {
  LoadNextJobAdvertisementDetailAction,
  LoadPreviousJobAdvertisementDetailAction
} from '../state-management/actions/job-ad-search.actions';
import { select, Store } from '@ngrx/store';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import {
  JobBadge,
  JobBadgesMapperService,
  JobBadgeType
} from '../job-badges-mapper.service';
import { DOCUMENT } from '@angular/common';
import {
  Notification,
  NotificationType
} from '../../shared/layout/notifications/notification.model';
import { JobDetailPanelId } from './job-detail-panel-id.enum';
import { JobDetailModelFactory } from './job-detail-model-factory';
import { JobDetailModel } from './job-detail-model';
import { map } from 'rxjs/operators';

const TOOLTIP_AUTO_HIDE_TIMEOUT = 2500;

@Component({
  selector: 'alv-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent extends AbstractSubscriber implements OnInit, AfterViewInit {

  jobDetailModel$: Observable<JobDetailModel>;

  prevEnabled$: Observable<boolean>;

  nextEnabled$: Observable<boolean>;

  badges$: Observable<JobBadge[]>;

  alerts$: Observable<Notification[]>;

  jobDetailPanelId = JobDetailPanelId;

  @ViewChild(NgbTooltip)
  clipboardTooltip: NgbTooltip;

  private readonly ALERTS = {
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
    }
  };

  constructor(
    private jobBadgesMapperService: JobBadgesMapperService,
    private jobDetailModelFactory: JobDetailModelFactory,
    private store: Store<JobAdSearchState>,
    @Inject(DOCUMENT) private document: any) {
    super();
  }

  ngAfterViewInit(): void {
    this.document.querySelector('main').scroll(0, 0);
  }

  ngOnInit() {
    const job$ = this.store.pipe(select(getSelectedJobAdvertisement));

    this.jobDetailModel$ = this.jobDetailModelFactory.create(job$);

    this.alerts$ = job$.pipe(map(this.mapJobAdAlerts.bind(this)));
    this.badges$ = job$.pipe(map(job => this.jobBadgesMapperService.map(job, [
      JobBadgeType.CONTRACT_TYPE,
      JobBadgeType.AVAILABILITY,
      JobBadgeType.WORKPLACE,
      JobBadgeType.WORKLOAD
    ])));

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
    this.clipboardTooltip.open();
    setTimeout(() => this.clipboardTooltip.close(), TOOLTIP_AUTO_HIDE_TIMEOUT);
  }

  dismissAlert(alert: Notification, alerts: Notification[]) {
    alerts.splice(alerts.indexOf(alert), 1);
  }

  private getJobUrl() {
    return window.location.href;
  }

  private mapJobAdAlerts(job: JobAdvertisement): Notification[] {
    const alerts = [];
    if (this.isExternal(job.sourceSystem)) {
      alerts.push(this.ALERTS.jobAdExternal);
    }
    if (this.isDeactivated(job.status)) {
      alerts.push(this.ALERTS.jobAdDeactivated);
    }
    if (this.isUnvalidated(job)) {
      alerts.push(this.ALERTS.jobAdUnvalidated);
    }
    return alerts;
  }

  private isDeactivated(jobAdvertisementStatus: JobAdvertisementStatus): boolean {
    return jobAdvertisementStatus.toString() === 'CANCELLED' || jobAdvertisementStatus.toString() === 'ARCHIVED';
  }

  private isExternal(sourceSystem: SourceSystem) {
    return sourceSystem.toString() === 'EXTERN';
  }

  private isUnvalidated(jobAdvertisement: JobAdvertisement): boolean {
    return jobAdvertisement.sourceSystem.toString() === 'API'
      && !jobAdvertisement.stellennummerAvam;
  }

}
