import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Salutation } from '../../../shared/backend-services/shared.types';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import {
  JobAdvertisement,
  JobAdvertisementComplaintRequest
} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { select, Store } from '@ngrx/store';
import { getSelectedJobAdvertisement, JobAdSearchState } from '../state-management/state';

interface ComplaintFormValues {
  salutation: Salutation;
  name: string;
  phone: string;
  email: string;
  complaintMessage: string;
}

@Component({
  selector: 'alv-job-ad-complain-modal',
  templateUrl: './complain-modal.component.html',
  styleUrls: ['./complain-modal.component.scss']
})
export class ComplainModalComponent implements OnInit {

  public form: FormGroup;

  readonly MAX_LENGTH_255 = 255;
  readonly MAX_LENGTH_1000 = 1000;
  private jobId;

  salutationOptions$ = of([
      {
        value: null,
        label: 'home.tools.job-publication.no-selection'
      },
      ...Object.keys(Salutation).map(language => {
        return {
          value: language,
          label: 'global.contactPerson.salutation.' + language
        };
      })
    ]
  );

  constructor(public modal: NgbActiveModal,
              private authenticationService: AuthenticationService,
              private fb: FormBuilder,
              private jobAdRepository: JobAdvertisementRepository,
              private store: Store<JobAdSearchState>) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      salutation: ['', Validators.required],
      name: [null, [Validators.required, Validators.maxLength(this.MAX_LENGTH_255)]],
      phone: [null, Validators.required],
      email: [null],
      complaintMessage: [null, [Validators.required, Validators.maxLength(this.MAX_LENGTH_1000)]]
    });
    this.store.pipe(select(getSelectedJobAdvertisement)).subscribe((job: JobAdvertisement) => this.jobId = job.id);
  }

  public sendComplaintAndCloseModal() {
    this.jobAdRepository.sendComplaint(this.mapComplaintRequest(this.form.value)).subscribe(() => {
      this.modal.close();
    }, () => {
      this.modal.dismiss();
    });
  }

  private mapComplaintRequest(complaint: ComplaintFormValues): JobAdvertisementComplaintRequest {
    return {
      jobAdvertisementId: this.jobId,
      complaintMessage: complaint.complaintMessage,
      contactInformation: {
        salutation: complaint.salutation,
        name: complaint.name,
        phone: complaint.phone,
        email: complaint.email
      }
    };
  }

}
