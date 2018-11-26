import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import {
  ContractType,
  JobSearchFilter,
  Sort
} from '../../pages/job-search-page/job-search.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'alv-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {
  form: FormGroup = this.fb.group({
    sort: [''],
    company: [''],
    contractType: [''],
    workloadPercentageMin: [0],
    workloadPercentageMax: [100],
    onlineSince: [30]
  });

  @Output()
  filtersChange: Observable<JobSearchFilter> = this.form.valueChanges;

  sortOptions$: Observable<SelectableOption[]> = of([{
    value: Sort.RELEVANCE_DESC,
    label: 'job-search.filter.sort.option.RELEVANCE_DESC'
  },
    {
      value: Sort.DATE_ASC,
      label: 'job-search.filter.sort.option.DATE_ASC'
    },
    {
      value: Sort.DATE_DESC,
      label: 'job-search.filter.sort.option.DATE_DESC'
    }]);

  percentages$: Observable<SelectableOption[]> = of([
    { label: '0%', value: 0 },
    { label: '10%', value: 10 },
    { label: '20%', value: 20 },
    { label: '30%', value: 30 },
    { label: '40%', value: 40 },
    { label: '50%', value: 50 },
    { label: '60%', value: 60 },
    { label: '70%', value: 70 },
    { label: '80%', value: 80 },
    { label: '90%', value: 90 },
    { label: '100%', value: 100 }
  ]);

  contractTypeOptions$: Observable<SelectableOption[]> = of([
    {
      value: ContractType.PERMANENT,
      label: 'job-search.filter.contract-type.option.PERMANENT'
    },
    {
      value: ContractType.TEMPORARY,
      label: 'job-search.filter.contract-type.option.TEMPORARY'
    },
    {
      value: ContractType.ALL,
      label: 'job-search.filter.contract-type.option.ALL'
    }
  ]);

  constructor(private fb: FormBuilder, private translateService: TranslateService) {
  }

  ngOnInit() {

  }

  updateSliderValue(value: number) {
    this.form.controls.onlineSince.setValue(value);
  }

}
