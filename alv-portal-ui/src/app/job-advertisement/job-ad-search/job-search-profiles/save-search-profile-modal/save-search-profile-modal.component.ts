import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobAdSearchProfilesRepository } from '../../../../shared/backend-services/job-ad-search-profiles/job-ad-search-profiles.repository';
import { JobAdSearchProfile } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';

@Component({
  selector: 'alv-save-search-profile-modal',
  templateUrl: './save-search-profile-modal.component.html',
  styleUrls: ['./save-search-profile-modal.component.scss']
})
export class SaveSearchProfileModalComponent implements OnInit {

  readonly MAX_LENGTH_50 = 50;

  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private jobAdSearchProfilesRepository: JobAdSearchProfilesRepository,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  onSubmit() {
    // TODO: How to retrieve the filter values?
    this.jobAdSearchProfilesRepository.create(<JobAdSearchProfile>{})
      .subscribe(searchProfile => {
        this.activeModal.close(searchProfile);
      });
  }

  onCancel() {
    this.activeModal.dismiss();
  }

}
