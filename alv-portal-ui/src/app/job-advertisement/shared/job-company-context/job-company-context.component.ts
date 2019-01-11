import { Component, Input, OnInit } from '@angular/core';
import { JobDetailModel } from '../job-detail-model';

@Component({
  selector: 'alv-job-company-context',
  templateUrl: './job-company-context.component.html',
  styleUrls: ['./job-company-context.component.scss']
})
export class JobCompanyContextComponent implements OnInit {

  @Input()
  jobDetailModel: JobDetailModel;

  constructor() { }

  ngOnInit() {
  }

}
