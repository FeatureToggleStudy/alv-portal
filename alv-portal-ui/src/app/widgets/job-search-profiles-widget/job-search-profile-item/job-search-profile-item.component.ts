import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobAdSearchProfileResult } from '../../../shared/backend-services/job-ad-search-profiles/job-ad-search-profiles.types';

@Component({
  selector: 'alv-job-search-profile-item',
  templateUrl: './job-search-profile-item.component.html',
  styleUrls: ['./job-search-profile-item.component.scss']
})
export class JobSearchProfileItemComponent implements OnInit {

  @Input() jobSearchProfile: JobAdSearchProfileResult;

  @Output() deleted = new EventEmitter<JobAdSearchProfileResult>();

  constructor() {
  }

  ngOnInit() {
  }

  deleteProfile(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.deleted.emit(this.jobSearchProfile);
  }

}
