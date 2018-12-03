import { Component, OnInit } from '@angular/core';
import {
  JobAdvertisement,
  JobAdvertisementStatus,
  JobDescription,
  SourceSystem
} from '../../shared/backend-services/job-advertisement/job-advertisement.model';
import { mockJobDetails } from './jobAdMock';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'alv-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  job: JobAdvertisement = mockJobDetails;
  jobDescription$: Observable<JobDescription>;
  showJobAdExternalMessage = false;
  showJobAdDeactivatedMessage = false;
  showJobAdUnvalidatedMessage = false;

  constructor(private translateService: TranslateService) {
    this.showJobAdDeactivatedMessage = this.isDeactivated(this.job.status);
    this.showJobAdExternalMessage = this.isExternal(this.job.sourceSystem);
    this.showJobAdUnvalidatedMessage = this.isUnvalidated(this.job);


    this.jobDescription$ = translateService.onLangChange.pipe(
      startWith({
        lang: translateService.currentLang,
        translations: {}
      }),
      map((langChangeEvent: LangChangeEvent) =>
        this.job.jobContent.jobDescriptions
          .find(d => d.languageIsoCode === langChangeEvent.lang)
        || this.job.jobContent.jobDescriptions[0]
      )
    );
  }


  ngOnInit() {

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

}
