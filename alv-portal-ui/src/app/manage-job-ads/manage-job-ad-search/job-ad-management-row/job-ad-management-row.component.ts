import { Component, Input, OnInit } from '@angular/core';
import { JobAdManagementRow } from './job-ad-management-row';

@Component({
  selector: 'alv-job-ad-management-row',
  templateUrl: './job-ad-management-row.component.html',
  styleUrls: ['./job-ad-management-row.component.scss']
})
export class JobAdManagementRowComponent implements OnInit {

  @Input()
  jobAdManagementRow: JobAdManagementRow;

  constructor() {
  }

  ngOnInit() {
  }

}
