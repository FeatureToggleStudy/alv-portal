import { Component, Input, OnInit } from '@angular/core';
import { JobDetailModel } from '../job-detail-model';
import { JobCenter } from '../../../shared/backend-services/reference-service/job-center.types';

@Component({
  selector: 'alv-job-center-context',
  templateUrl: './job-center-context.component.html',
  styleUrls: ['./job-center-context.component.scss']
})
export class JobCenterContextComponent implements OnInit {

  @Input()
  jobDetailModel: JobDetailModel;

  jobCenter: JobCenter;

  constructor() {
  }

  ngOnInit() {
    this.jobCenter = this.jobDetailModel.jobCenter;
  }

}
