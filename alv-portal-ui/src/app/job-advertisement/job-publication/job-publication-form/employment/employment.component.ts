import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectableOption } from '../../../../shared/forms/input/selectable-option.model';
import { BehaviorSubject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../../core/abstract-subscriber';
import {
  EmploymentDuration,
  WorkForm
} from '../../../../shared/backend-services/shared.types';
import { NgbDate, NgbDateNativeAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateInputComponent } from '../../../../shared/forms/input/date-input/date-input.component';
import { EmploymentFormValue } from './employment-form-value.types';
import { JobPublicationFormValueKeys } from '../job-publication-form-value.types';

@Component({
  selector: 'alv-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss']
})
export class EmploymentComponent extends AbstractSubscriber implements OnInit {

  todayDate = NgbDate.from(this.ngbDateNativeAdapter.fromModel(new Date()));

  @Input() parentForm: FormGroup;

  @ViewChild('startDate') startDate: DateInputComponent;

  @ViewChild('endDate') endDate: DateInputComponent;

  @Input()
  employmentFormValue: EmploymentFormValue;

  employment: FormGroup;

  defaultPercentages = [
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
    {
      value: true,
      label: 'home.tools.job-publication.employmentStartDate.immediately'
    }
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

  get workForms(): FormGroup {
    return this.employment.get('workForms') as FormGroup;
  }

  ngOnInit(): void {
    const { workloadPercentageMin, workloadPercentageMax, duration, immediately, startDate, endDate, workForms } = this.employmentFormValue;

    this.employment = this.fb.group({
      workloadPercentageMin: [workloadPercentageMin, [
        Validators.required
      ]],
      workloadPercentageMax: [workloadPercentageMax, [
        Validators.required
      ]],
      immediately: [immediately, [
        Validators.required
      ]],
      duration: [duration, [
        Validators.required
      ]],
      startDate: [{ value: startDate, disabled: immediately }, [Validators.required]],
      endDate: [{
        value: endDate,
        disabled: duration !== EmploymentDuration.TEMPORARY
      }, [Validators.required]],
      workForms: this.fb.group(this.workFormOptions.reduce((acc, curr) => {
        acc[curr.value] = workForms[curr.value];
        return acc;
      }, {}))
    });

    this.parentForm.addControl(JobPublicationFormValueKeys.EMPLOYMENT, this.employment);
    this.setupWorkload();
    this.setupWorkStart();
    this.setupWorkDuration();
  }

  getEmploymentEndMinDate(): NgbDateStruct {
    const selectedStartDate = this.employment.get('startDate').value;
    if (!!selectedStartDate && this.todayDate.before(selectedStartDate)) {
      return selectedStartDate;
    }
    return this.todayDate;
  }

  getEmploymentStartMaxDate(): NgbDateStruct {
    const selectedEndDate = this.employment.get('endDate').value;
    if (!selectedEndDate) {
      // no max date
      return;
    }
    if (this.todayDate.before(selectedEndDate)) {
      return selectedEndDate;
    }
    return this.todayDate;
  }

  resetEndDate() {
    this.employment.get('endDate').patchValue(null);
  }

  resetStartDate() {
    this.employment.get('startDate').patchValue(null);
  }

  private setupWorkload() {
    this.employment.get('workloadPercentageMin').valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(percentageMin => {
        this.percentagesMax$.next(this.defaultPercentages.filter(item => item.value >= percentageMin));
      });

    this.employment.get('workloadPercentageMax').valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(percentageMax => {
        this.percentagesMin$.next(this.defaultPercentages.filter(item => item.value <= percentageMax));
      });
  }

  private setupWorkStart() {
    this.employment.get('immediately').valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(immediately => {
        const control = this.employment.get('startDate');
        if (!immediately) {
          control.enable();
          setTimeout(() => {
            this.startDate.focus();
          });
        } else {
          control.disable();
        }
      });
  }

  private setupWorkDuration() {
    this.employment.get('duration').valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(duration => {
        const control = this.employment.get('endDate');
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

