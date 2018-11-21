import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';

@Component({
  selector: 'alv-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {
  form: FormGroup = this.fb.group({
    sort: [''],
    employer: [''],
    contractType: [''],
    workloadFrom: [0],
    workloadTo: [100]
  });
  @Output()
  filtersChange = this.form.valueChanges;

  sortOptions$: Observable<SelectableOption[]> = of([{
    value: 'relevance',
    label: 'Relevance'
  },
    {
      value: 'dateasc',
      label: 'Dateasc'
    },
    {
      value: 'datedesc',
      label: 'Datedesc'
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
      value: 'permanent',
      label: 'permanent'
    },
    {
      value: 'temporary',
      label: 'temporary'
    },
    {
      value: 'all',
      label: 'all'
    }
  ]);

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

}
