import { Component, OnInit, ViewChild } from '@angular/core';
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

const TOOLTIP_AUTO_HIDE_TIMEOUT = 2500;

@Component({
  selector: 'alv-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent extends AbstractSubscriber implements OnInit {
  job$: Observable<JobAdvertisement>;
  jobDescription$: Observable<JobDescription>;
  jobCenter$: Observable<JobCenter>;
  showJobAdExternalMessage = false;
  showJobAdDeactivatedMessage = false;
  showJobAdUnvalidatedMessage = false;
  prevVisible$: Observable<boolean>;
  nextVisible$: Observable<boolean>;

  @ViewChild(NgbTooltip)
  clipboardTooltip: NgbTooltip;

  constructor(private i18nService: I18nService,
              private referenceServiceRepository: ReferenceServiceRepository,
              private store: Store<JobAdSearchState>) {
    super();
  }

  ngOnInit() {

    this.job$ = this.store
      .pipe(select(getSelectedJobAdvertisement))
      .pipe(tap(job => {
        this.showJobAdDeactivatedMessage = this.isDeactivated(job.status);
        this.showJobAdExternalMessage = this.isExternal(job.sourceSystem);
        this.showJobAdUnvalidatedMessage = this.isUnvalidated(job);
      }));

    this.jobDescription$ = combineLatest(this.job$, this.i18nService.currentLanguage$).pipe(
      map(([job, currentLanguage]) => JobAdvertisementUtils.getJobDescription(job, currentLanguage))
    );

    const jobCenterCode$ = this.job$.pipe(
      filter((job) => !!job),
      map((job) => job.jobCenterCode),
      filter((jobCenterCode) => !!jobCenterCode));

    this.jobCenter$ = combineLatest(jobCenterCode$, this.i18nService.currentLanguage$).pipe(
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

  getJobUrl() {
    return window.location.href;
  }

  printJob() {
    window.print();
  }

  onCopyLink(): void {
    this.clipboardTooltip.open();
    setTimeout(() => this.clipboardTooltip.close(), TOOLTIP_AUTO_HIDE_TIMEOUT);
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
