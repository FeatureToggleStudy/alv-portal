import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectableOption } from '../../../../shared/forms/input/selectable-option.model';
import { Observable, of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagedJobAdsSearchFilter } from '../../state-management/state';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'alv-filter-managed-job-ads',
  templateUrl: './filter-managed-job-ads.component.html',
  styleUrls: ['./filter-managed-job-ads.component.scss']
})
export class FilterManagedJobAdsComponent implements OnInit {

  form: FormGroup;

  currentFiltering$: Observable<ManagedJobAdsSearchFilter>;

  onlineSinceOptions$: Observable<SelectableOption[]>;
  jobsCreatorOptions$: Observable<SelectableOption[]>;

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
    this.currentFiltering$.subscribe(currentFilter => {
      this.form = this.fb.group({
        onlineSinceDays: [currentFilter.onlineSinceDays],
        ownerUserId: [currentFilter.ownerUserId]
      });
    });

    this.jobsCreatorOptions$ = this.authenticationService.getCurrentUser().pipe(
      map(user => {
        return [
          {
            label: 'All',
            value: '',
          },
          {
            label: 'Current user',
            value: user.id
          }
        ];
      })
    );
  }

  filter() {

    this.activeModal.close({
      onlineSinceDays: this.form.controls['onlineSinceDays'].value,
      ownerUserId: this.form.controls['ownerUserId'].value
    });
  }

  cancel() {
    this.activeModal.dismiss();
  }


}
