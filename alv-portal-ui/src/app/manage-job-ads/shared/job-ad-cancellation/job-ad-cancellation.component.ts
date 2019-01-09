import { Component, Input, OnInit } from '@angular/core';
import {
  CancellationReason,
  JobAdvertisement
} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'alv-job-ad-cancelation-dialog',
  templateUrl: './job-ad-cancellation.component.html',
  styleUrls: ['./job-ad-cancellation.component.scss']
})
export class JobAdCancellationComponent implements OnInit {

  @Input()
  jobAdvertisement: JobAdvertisement;

  @Input()
  accessToken: string;

  form: FormGroup;

  static mapToCancellationReason(formValue): CancellationReason {
    switch (formValue.positionOccupied) {
      case 'jobCenter':
        return CancellationReason.OCCUPIED_JOBCENTER;
      case 'privateAgency':
        return CancellationReason.OCCUPIED_AGENCY;
      case 'jobRoom':
        return CancellationReason.OCCUPIED_JOBROOM;
      case 'notJobRoom':
        return CancellationReason.OCCUPIED_OTHER;
      case 'changeOrRepost':
        return CancellationReason.CHANGE_OR_REPOSE;
      default:
        return CancellationReason.NOT_OCCUPIED;
    }
  }

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private jobAdvertisementRepository: JobAdvertisementRepository) {
  }

  ngOnInit() {
    this.form = this.fb.group({ positionOccupied: ['', Validators.required] });
  }

  onSubmit() {
    this.jobAdvertisementRepository.cancel({
      code: JobAdCancellationComponent.mapToCancellationReason(this.form.value.positionOccupied),
      id: this.jobAdvertisement.id,
      token: this.accessToken
    }).subscribe(() => {
      this.activeModal.close();
    });
  }

}
