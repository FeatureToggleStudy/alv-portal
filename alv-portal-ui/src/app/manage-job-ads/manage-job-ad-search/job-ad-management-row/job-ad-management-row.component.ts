import { Component, Input, OnInit } from '@angular/core';
import { JobAdManagementRow } from './job-ad-management-row';

@Component({
  // we need to use attribute selector because we don't want angular to create an element
  // in the html structure breaking the bootstrap styles.
  // tslint:disable-next-line
  selector: '[alv-job-ad-management-row]',
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
