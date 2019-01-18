import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployerFormValue, emptyEmployerFormValue } from './employer-form-value.types';
import { IsoCountryService } from '../iso-country.service';
import { Observable } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { JobPublicationFormValueKeys } from '../job-publication-form-value.types';

@Component({
  selector: 'alv-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit, OnDestroy {

  readonly NAME_MAX_LENGTH = 255;

  @Input()
  parentForm: FormGroup;

  @Input()
  set employerFormValue(value: EmployerFormValue) {
    this._employerFormValue = value;
    this.setFormValue(value);
  }

  get employerFormValue() {
    return this._employerFormValue;
  }

  employer: FormGroup;

  countryOptions$: Observable<SelectableOption[]>;

  countryIsoCode$: Observable<String>;

  private _employerFormValue: EmployerFormValue;

  constructor(private isoCountryService: IsoCountryService,
              private fb: FormBuilder) {

    this.countryOptions$ = this.isoCountryService.countryOptions$;

    this.employer = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(this.NAME_MAX_LENGTH)
      ]],
      countryIsoCode: [null, []]
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl(JobPublicationFormValueKeys.employer, this.employer);

    const countryIsoCode = this.employer.get('countryIsoCode');
    this.countryIsoCode$ = countryIsoCode.valueChanges
      .pipe(
        filter((value) => !!value),
        startWith(countryIsoCode.value),
      );
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl(JobPublicationFormValueKeys.employer);
  }

  private setFormValue(value: EmployerFormValue) {
    const { name, countryIsoCode } = value;
    this.employer.patchValue({ name, countryIsoCode }, { emitEvent: false });
  }
}
