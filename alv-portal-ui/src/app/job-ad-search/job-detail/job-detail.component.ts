import { Component, OnInit } from '@angular/core';
import { JobSearchModel } from '../job-search.model';

@Component({
  selector: 'alv-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  constructor(jobSearchModel: JobSearchModel) {
  }

  ngOnInit() {
  }

}
