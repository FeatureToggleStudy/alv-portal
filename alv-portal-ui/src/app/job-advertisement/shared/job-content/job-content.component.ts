import { Component, Input, OnInit } from '@angular/core';
import { JobDetailModel } from '../job-detail-model';
import { JobBadge } from '../job-badges-mapper.service';

@Component({
  selector: 'alv-job-content',
  templateUrl: './job-content.component.html',
  styleUrls: ['./job-content.component.scss']
})
export class JobContentComponent implements OnInit {

  @Input()
  jobDetailModel: JobDetailModel;

  @Input()
  badges: JobBadge[];

  jobDetailPanelId = JobDetailPanelId;

  constructor() {
  }

  ngOnInit() {
  }

}

enum JobDetailPanelId {
  JOB_AD_INFO = 'job-ad-info',
  JOB_AD_REQUIREMENTS = 'job-ad-requirements',
  JOB_AD_LANGUAGES = 'job-ad-languages',
  JOB_AD_CONTACT_DETAILS = 'job-ad-contact-details'
}
