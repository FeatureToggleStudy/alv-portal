import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  JobAdvertisement,
  JobAdvertisementStatus,
  JobDescription,
  SourceSystem
} from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { combineLatest, Observable } from 'rxjs';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { filter, flatMap, map, tap } from 'rxjs/operators';
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
import { I18nService } from '../../core/i18n.service';
import { JobAdvertisementUtils } from '../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { ReferenceServiceRepository } from '../../shared/backend-services/reference-service/reference-service.repository';
import { JobCenter } from '../../shared/backend-services/reference-service/reference-service.types';
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

const TOOLTIP_AUTO_HIDE_TIMEOUT = 2500;

@Component({
  selector: 'alv-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent extends AbstractSubscriber implements OnInit, AfterViewInit {

  job$: Observable<JobAdvertisement>;

  jobDescription$: Observable<JobDescription>;

  jobCenter$: Observable<JobCenter>;

  prevVisible$: Observable<boolean>;

  nextVisible$: Observable<boolean>;

  jobAdExternalMessage: string;

  jobAdDeactivatedMessage: string;

  jobAdUnvalidatedMessage: string;

  badges: JobBadge[];

  alerts: Notification[];

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

  @ViewChild(NgbTooltip)
  clipboardTooltip: NgbTooltip;

  constructor(private i18nService: I18nService,
              private referenceServiceRepository: ReferenceServiceRepository,
              private jobBadgesMapperService: JobBadgesMapperService,
              private store: Store<JobAdSearchState>,
              @Inject(DOCUMENT) private document: any) {
    super();
  }

  ngAfterViewInit(): void {
    this.document.querySelector('main').scroll(0, 0);
  }

  ngOnInit() {
    this.job$ = this.store
      .pipe(
        select(getSelectedJobAdvertisement),
        tap(job => {
          this.alerts = this.mapJobAdAlerts(job);
          this.badges = this.jobBadgesMapperService.map(job, [
            JobBadgeType.CONTRACT_TYPE,
            JobBadgeType.AVAILABILITY,
            JobBadgeType.WORKPLACE,
            JobBadgeType.WORKLOAD
          ]);
        }));

    this.jobDescription$ = combineLatest(this.job$, this.i18nService.currentLanguage$)
      .pipe(
        map(([job, currentLanguage]) =>
          JobAdvertisementUtils.getJobDescription(job, currentLanguage))
      );
    const jobWithOccupation$ = this.job$.pipe(
      filter(job => job.jobContent.occupations && !!job.jobContent.occupations.length)
    );


    const jobCenterCode$ = this.job$
      .pipe(
        filter((job) => !!job),
        map((job) => job.jobCenterCode),
        filter((jobCenterCode) => !!jobCenterCode));

    this.jobCenter$ = combineLatest(jobCenterCode$, this.i18nService.currentLanguage$)
      .pipe(
        flatMap(([jobCenterCode, currentLanguage]) => this.referenceServiceRepository.resolveJobCenter(jobCenterCode, currentLanguage))
      );

    this.prevVisible$ = this.store.pipe(select(isPrevVisible));
    this.nextVisible$ = this.store.pipe(select(isNextVisible));

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

  dismissAlert(alert: Notification) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
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
