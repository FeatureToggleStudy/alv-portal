import { Component, OnInit, ViewChild } from '@angular/core';
import {
  JobAdvertisement,
  JobAdvertisementStatus,
  JobDescription,
  SourceSystem
} from '../../shared/backend-services/job-advertisement/job-advertisement.model';
import { mockJobDetails } from './jobAdMock';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { JobCenter, ReferenceService } from '../reference.service';
import { JobAdvertisementService } from '../../shared/backend-services/job-advertisement/job-advertisement.service';


const TOOLTIP_AUTO_HIDE_TIMEOUT = 2500;


@Component({
  selector: 'alv-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  job: JobAdvertisement = mockJobDetails; //for now just fetch something static
  jobDescription$: Observable<JobDescription>;
  jobCenter$: Observable<JobCenter>;

  showJobAdExternalMessage = false;
  showJobAdDeactivatedMessage = false;
  showJobAdUnvalidatedMessage = false;

  @ViewChild(NgbTooltip)
  clipboardTooltip: NgbTooltip;

  constructor(private translateService: TranslateService,
              private referenceService: ReferenceService,
              private jobAdvertisementService: JobAdvertisementService) {

    this.showJobAdDeactivatedMessage = this.isDeactivated(this.job.status);
    this.showJobAdExternalMessage = this.isExternal(this.job.sourceSystem);
    this.showJobAdUnvalidatedMessage = this.isUnvalidated(this.job);

  }


  ngOnInit() {

    this.jobDescription$ = this.translateService.onLangChange.pipe(
      startWith({
        lang: this.translateService.currentLang,
        translations: {}
      }),
      map((langChangeEvent: LangChangeEvent) =>
        this.job.jobContent.jobDescriptions
          .find(d => d.languageIsoCode === langChangeEvent.lang)
        || this.job.jobContent.jobDescriptions[0]
      )
    );

    this.jobCenter$ = this.translateService.onLangChange.pipe(
      startWith({
        lang: this.translateService.currentLang,
        translations: {}
      }),
      switchMap((langChangeEvent: LangChangeEvent) => {
        console.log('yo');
        return this.referenceService.resolveJobCenter(this.job.jobCenterCode, langChangeEvent.lang
        )
      })
    );

  }

  getJobUrl() {
    return window.location.href;
  }

  private isDeactivated(jobAdvertisementStatus: JobAdvertisementStatus): boolean {
    return jobAdvertisementStatus.toString() === 'CANCELLED' || jobAdvertisementStatus.toString() === 'ARCHIVED';
  }

  private isExternal(sourceSystem: SourceSystem) {
    return sourceSystem.toString() === 'EXTERN';
  }

  private isUnvalidated(jobAdvertisement: JobAdvertisement): boolean {
    return jobAdvertisement.sourceSystem.toString() === 'API'
      && !jobAdvertisement.stellennummerAvam
  }

  printJob() {
    window.print();
  }

  onCopyLink(): void {
    this.clipboardTooltip.open();
    setTimeout(() => this.clipboardTooltip.close(), TOOLTIP_AUTO_HIDE_TIMEOUT)
  }


}
