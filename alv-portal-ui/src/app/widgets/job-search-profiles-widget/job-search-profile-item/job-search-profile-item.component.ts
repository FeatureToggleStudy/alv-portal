import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobAdSearchProfileRequest } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { JobAdSearchProfilesRepository } from '../../../shared/backend-services/job-ad-search-profiles/job-ad-search-profiles.repository';

@Component({
  selector: 'alv-job-search-profile-item',
  templateUrl: './job-search-profile-item.component.html',
  styleUrls: ['./job-search-profile-item.component.scss']
})
export class JobSearchProfileItemComponent implements OnInit {

  @Input() jobSearchProfile: JobAdSearchProfileRequest;

  @Output() deleted = new EventEmitter<JobAdSearchProfileRequest>();

  constructor(private modalService: ModalService,
              private jobAdSearchProfilesRepository: JobAdSearchProfilesRepository) { }

  ngOnInit() {
  }

  deleteProfile(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.deleted.emit(this.jobSearchProfile);
  }

}
