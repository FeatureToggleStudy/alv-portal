import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { ContractType, JobSearchFilter, Sort } from '../../job-search-filter.types';

@Component({
  selector: 'alv-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  form: FormGroup;

  @Output()
  filtersChange: Subject<JobSearchFilter> = new Subject<JobSearchFilter>();

  @Input()
  jobSearchFilter: JobSearchFilter;

  expanded = false;

  restrictOptions$: Observable<SelectableOption[]> = of([
    {
      value: false,
      label: 'portal.job-search.filter.reporting-obligation.all.label'
    },
    {
      value: true,
      label: 'job-search.filter.restricted-jobs.label'
    }
  ]);

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

  defaultPercentages = [
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
  ];

  percentagesMin$: BehaviorSubject<SelectableOption[]> = new BehaviorSubject<SelectableOption[]>(this.defaultPercentages);

  percentagesMax$: BehaviorSubject<SelectableOption[]> = new BehaviorSubject<SelectableOption[]>(this.defaultPercentages);

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


  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      displayRestricted: [this.jobSearchFilter.displayRestricted],
      sort: [this.jobSearchFilter.sort],
      company: [this.jobSearchFilter.company],
      contractType: [this.jobSearchFilter.contractType],
      workloadPercentageMin: [this.jobSearchFilter.workloadPercentageMin],
      workloadPercentageMax: [this.jobSearchFilter.workloadPercentageMax],
      onlineSince: [this.jobSearchFilter.onlineSince]
    });
    this.form.valueChanges.subscribe(changedValues => this.filtersChange.next(changedValues));

    this.form.get('workloadPercentageMin').valueChanges.subscribe(percentageMin => {
      this.percentagesMax$.next(this.defaultPercentages.filter(item => item.value >= percentageMin));
    });
    this.form.get('workloadPercentageMax').valueChanges.subscribe(percentageMax => {
      this.percentagesMin$.next(this.defaultPercentages.filter(item => item.value <= percentageMax));
    });
  }

  updateSliderValue(value: number) {
    this.form.controls.onlineSince.setValue(value);
  }

  getOnlineSinceLabel(value: number): string {
    if (value === 1) {
      return 'job-search.filter.online-since.day.one';
    } else {
      return 'job-search.filter.online-since.day.many';
    }
  }
}
