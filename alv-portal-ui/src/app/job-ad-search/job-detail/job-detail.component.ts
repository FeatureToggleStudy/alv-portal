import { Component, OnInit } from '@angular/core';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.model';
import { mockJobDetails } from './jobAdMock';

@Component({
  selector: 'alv-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  job: JobAdvertisement = mockJobDetails;

  constructor() {
  }


  ngOnInit() {
  }

}
