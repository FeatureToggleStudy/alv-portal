import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { BehaviorSubject, of } from 'rxjs/index';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { WorkForm } from '../../../shared/backend-services/shared.types';

@Component({
  selector: 'alv-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss']
})
export class EmploymentComponent extends AbstractSubscriber implements OnInit {

  @Input()
  parentForm: FormGroup;

  employmentGroup: FormGroup;

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

  workFormOptions = Object.keys(WorkForm).map(workForm => {
    return {
      value: workForm,
      label: 'global.workForm.' + workForm
    };
  });

  employmentStartDateOptions$ = of([
    { value: true, label: 'immediate' },
    { value: false, label: 'from' },
  ]);

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.employmentGroup = this.fb.group({
      workloadPercentageMin: 100,
      workloadPercentageMax: 100,
      immediately: true,

      workForms: this.fb.array(this.workFormOptions.map(option => {
        return this.fb.group({
          [option.value]: false
        });
      }))
    });

    this.parentForm.addControl('employment', this.employmentGroup);

    this.employmentGroup.get('workloadPercentageMin').valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(percentageMin => {
        this.percentagesMax$.next(this.defaultPercentages.filter(item => item.value >= percentageMin));
      });

    this.employmentGroup.get('workloadPercentageMax').valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(percentageMax => {
        this.percentagesMin$.next(this.defaultPercentages.filter(item => item.value <= percentageMax));
      });
  }

  get workForms() {
    return this.employmentGroup.get('workForms');
  }
}
