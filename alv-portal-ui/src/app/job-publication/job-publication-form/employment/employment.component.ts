import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { BehaviorSubject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import {
  EmploymentDuration,
  WorkForm
} from '../../../shared/backend-services/shared.types';
import { NgbDate, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DateInputComponent } from '../../../shared/forms/input/date-input/date-input.component';

@Component({
  selector: 'alv-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss']
})
export class EmploymentComponent extends AbstractSubscriber implements OnInit {

  minDateEmploymentStart = NgbDate.from(this.ngbDateNativeAdapter.fromModel(new Date()));

  @Input() parentForm: FormGroup;

  @ViewChild('startDate') startDate: DateInputComponent;

  @ViewChild('endDate') endDate: DateInputComponent;

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

  employmentStartImmediate$ = of([
    { value: true, label: 'home.tools.job-publication.employmentStartDate.immediately' }
  ]);
  employmentStartFrom$ = of([
    {
      value: false,
      label: 'home.tools.job-publication.employmentStartDate.by-arrangement'
    }
  ]);
  employmentDurationPermanent$ = of([
    {
      value: EmploymentDuration.PERMANENT,
      label: 'home.tools.job-publication.employmentEndDate.permanent'
    }
  ]);
  employmentDurationTemporary$ = of([
    {
      value: EmploymentDuration.TEMPORARY,
      label: 'home.tools.job-publication.employmentEndDate.temporary'
    }
  ]);
  employmentDurationShortEmployment$ = of([
    {
      value: EmploymentDuration.SHORT_EMPLOYMENT,
      label: 'home.tools.job-publication.shortEmployment.label'
    }
  ]);

  constructor(private fb: FormBuilder,
              private ngbDateNativeAdapter: NgbDateNativeAdapter) {
    super();
  }

  get workForms() {
    return this.employmentGroup.get('workForms');
  }

  ngOnInit(): void {
    this.employmentGroup = this.fb.group({
      workloadPercentageMin: 100,
      workloadPercentageMax: 100,
      immediately: true,
      duration: EmploymentDuration.PERMANENT,
      startDate: { value: null, disabled: true },
      endDate: { value: null, disabled: true },
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

    this.employmentGroup.get('immediately').valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(immediately => {
        const control = this.employmentGroup.get('startDate');
        if (!immediately) {
          control.enable();
          setTimeout(() => {
            this.startDate.focus();
          });
        } else {
          control.disable();
        }
      });

    this.employmentGroup.get('duration').valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(duration => {
        const control = this.employmentGroup.get('endDate');
        switch (duration) {
          case EmploymentDuration.PERMANENT:
            control.disable();
            break;
          case EmploymentDuration.TEMPORARY:
            control.enable();
            setTimeout(() => {
              this.endDate.focus();
            });
            break;
          case EmploymentDuration.SHORT_EMPLOYMENT:
            control.disable();
            break;
        }
      });

  }
}

