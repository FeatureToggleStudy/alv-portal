import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '../../../../shared/components/select/select-option.model';
import { DateIntervalFormGroup } from '../../../../shared/components/date-interval-input/date-interval-form-group';
import { Observable } from 'rxjs/internal/Observable';
import { AbsencesModel } from './absences.model';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'os-absences',
  templateUrl: './absences.component.html',
})
export class AbsencesComponent implements OnInit {

  @Input()
  model: AbsencesModel;
  form: FormGroup;

  possibleReasons$: Observable<SelectOption[]>;

  constructor(private fb: FormBuilder) {
  }

  get absences(): FormArray {
    return this.form.get('absences') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
          away: this.fb.control(true, Validators.required),
          absences: this.fb.array([
            this.getDefaultAbsence()
          ]),
        }
    );
    this.possibleReasons$ = of([{
      label: 'vacation',
      value: 'vacation',
    }, {
      label: 'military',
      value: 'military'
    }, {
      label: 'other',
      value: 'other'
    }]);
  }

  getDefaultAbsence() {
    return this.fb.group({
      period: new DateIntervalFormGroup({
        from: this.fb.control({ year: 2018, month: 9, day: 29 }, Validators.required),
        to: this.fb.control({ year: 2018, month: 10, day: 18 }, Validators.required)
      }),
      reason: this.fb.control('', Validators.required),
      note: this.fb.control(''),
    });
  }

  removeAbsence(i: number) {
    this.absences.removeAt(i);
  }

  addAbsence() {
    this.absences.push(this.getDefaultAbsence());

  }
}
