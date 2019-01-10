import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectableOption } from '../../../../shared/forms/input/selectable-option.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'alv-filter-managed-job-ads',
  templateUrl: './filter-managed-job-ads.component.html',
  styleUrls: ['./filter-managed-job-ads.component.scss']
})
export class FilterManagedJobAdsComponent implements OnInit {

  form: FormGroup;

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
      value: 90
    },
    {
      label: 'dashboard.job-publication.publication-period.months',
      value: 180
    },
    {
      label: 'dashboard.job-publication.publication-period.year',
      value: 365
    },
    {
      label: 'dashboard.job-publication.publication-period.all',
      value: null
    }
  ]);

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      onlineSinceDays: ['']
    });
  }

  filter() {
    console.log('filter');
  }


}
