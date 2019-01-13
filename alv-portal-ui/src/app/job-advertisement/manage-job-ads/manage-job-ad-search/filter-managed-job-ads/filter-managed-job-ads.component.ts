import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectableOption } from '../../../../shared/forms/input/selectable-option.model';
import { Observable, of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagedJobAdSearchFilterValues } from '../managed-job-ad-search-types';

@Component({
  selector: 'alv-filter-managed-job-ads',
  templateUrl: './filter-managed-job-ads.component.html',
  styleUrls: ['./filter-managed-job-ads.component.scss']
})
export class FilterManagedJobAdsComponent implements OnInit {

  form: FormGroup;

  currentFiltering: Observable<ManagedJobAdSearchFilterValues>;

  onlineSinceOptions$: Observable<SelectableOption[]> = of([
    {
      label: 'dashboard.job-publication.publication-period.week',
      value: 7
    },
    {
      label: 'dashboard.job-publication.publication-period.month',
      value: 30
    },
    {
      label: 'dashboard.job-publication.publication-period.months',
      labelParameters: {
        months: 3
      },
      value: 90
    },
    {
      label: 'dashboard.job-publication.publication-period.months',
      labelParameters: {
        months: 3
      },
      value: 180
    },
    {
      label: 'dashboard.job-publication.publication-period.year',
      labelParameters: {
        years: 1
      },
      value: 365
    },
    {
      label: 'dashboard.job-publication.publication-period.all',
      value: null
    }
  ]);

  constructor(private fb: FormBuilder,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      onlineSinceDays: ['']
    });
  }

  filter() {
    console.log(this.form.controls['onlineSinceDays'].value);
    const result: ManagedJobAdSearchFilterValues = {
      onlineSinceDays: this.form.controls['onlineSinceDays'].value
    };
    this.activeModal.close(result);
  }

  cancel() {
    this.activeModal.dismiss();
  }

}
