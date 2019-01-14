import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectableOption } from '../../../../shared/forms/input/selectable-option.model';
import { Observable, of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagedJobAdSearchFilterValues } from '../managed-job-ad-search-types';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { map } from 'rxjs/operators';
import { JobAdvertisementStatus } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';

@Component({
  selector: 'alv-filter-managed-job-ads',
  templateUrl: './filter-managed-job-ads.component.html',
  styleUrls: ['./filter-managed-job-ads.component.scss']
})
export class FilterManagedJobAdsComponent implements OnInit {

  form: FormGroup;

  currentFiltering: ManagedJobAdSearchFilterValues;

  onlineSinceOptions$: Observable<SelectableOption[]>;

  jobsCreatorOptions$: Observable<SelectableOption[]>;

  statusOptions$: Observable<SelectableOption[]>;

  constructor(private fb: FormBuilder,
              public activeModal: NgbActiveModal,
              private authenticationService: AuthenticationService) {
  }

  private static prepareOnlineSinceOptions() {
    const options = [7, 30, 90, 180, 365].map(days => ({
      label: 'dashboard.job-publication.publication-period.' + days,
      value: days
    }));
    options.push({
      label: 'dashboard.job-publication.publication-period.all',
      value: null
    });
    return options;
  }

  ngOnInit() {
    this.onlineSinceOptions$ = of(FilterManagedJobAdsComponent.prepareOnlineSinceOptions());

    this.form = this.fb.group({
      onlineSinceDays: [this.currentFiltering.onlineSinceDays],
      ownerUserId: [this.currentFiltering.ownerUserId],
      status: ['']
    });

    this.jobsCreatorOptions$ = this.authenticationService.getCurrentUser().pipe(
      map(user => {
        return [
          {
            label: 'portal.dashboard.job-publication.createdBy.all',
            value: null,
          },
          {
            label: 'portal.dashboard.job-publication.createdBy.me',
            value: user.id
          }
        ];
      })
    );
    this.statusOptions$ = of(Object.values(JobAdvertisementStatus)
      .map(s => ({
        label: 'global.job-publication.status.' + s,
        value: s
      }))
    );
  }

  filter() {
    const result: ManagedJobAdSearchFilterValues = {
      onlineSinceDays: this.form.controls['onlineSinceDays'].value,
      ownerUserId: this.form.controls['ownerUserId'].value
    };
    this.activeModal.close(result);
  }

  cancel() {
    this.activeModal.dismiss();
  }


}
