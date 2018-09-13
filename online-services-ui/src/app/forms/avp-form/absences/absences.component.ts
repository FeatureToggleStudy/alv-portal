import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbsencesModel } from './absences.model';
import { DateIntervalFormGroup } from '../../../shared/components/date-interval-input/date-interval-form-group';
import { Observable, of } from 'rxjs';
import { SelectOption } from '../../../shared/components/select/select-option.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';


@Component({
  selector: 'os-absences',
  templateUrl: './absences.component.html',
})
export class AbsencesComponent implements OnInit {

  @Input()
  model: AbsencesModel;
  form: FormGroup;

  possibleReasons$: Observable<SelectOption[]>;

  get absences(): FormArray {
    return this.form.get('absences') as FormArray;
  }

  constructor(private fb: FormBuilder) {
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
      period: this.fb.group(new DateIntervalFormGroup(this.fb, {
        from: new NgbDate(2018, 9, 29),
        to: new NgbDate(2018, 10, 18)
      })),
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
