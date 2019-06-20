import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectableOption } from '../../../../shared/forms/input/selectable-option.model';
import {
  WorkEffortResult,
  WorkEffortsFilterPeriod
} from '../../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';
import { WorkEffortsFilterValues } from '../work-efforts-filter.types';

@Component({
  selector: 'alv-work-efforts-filter-modal',
  templateUrl: './work-efforts-filter-modal.component.html',
  styleUrls: ['./work-efforts-filter-modal.component.scss']
})
export class WorkEffortsFilterModalComponent implements OnInit {

  form: FormGroup;

  currentFiltering: WorkEffortsFilterValues;

  periodOptions$: Observable<SelectableOption[]>;

  workEffortResultOptions$: Observable<SelectableOption[]>;

  constructor(private fb: FormBuilder,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      period: [this.currentFiltering.period],
      workEffortResult: [this.currentFiltering.workEffortResult]
    });

    this.periodOptions$ = of(Object.values(WorkEffortsFilterPeriod)
      .map(s => ({
        label: 'portal.work-efforts.filter.period.' + s,
        value: s
      }))
    );

    this.workEffortResultOptions$ = of(Object.values(WorkEffortResult)
      .map(s => ({
        label: 'portal.work-efforts.work-effort-result.' + s,
        value: s
      }))
    );
  }

  filter() {
    const result: WorkEffortsFilterValues = {
      period: this.form.controls['period'].value,
      workEffortResult: this.form.controls['workEffortResult'].value
    };
    this.activeModal.close(result);
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
