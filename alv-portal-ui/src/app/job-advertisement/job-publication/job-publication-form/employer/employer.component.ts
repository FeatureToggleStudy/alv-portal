import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployerFormValue } from './employer-form-value.types';
import { IsoCountryService } from '../../../../shared/localities/iso-country.service';
import { Observable } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';
import { SelectableOption } from '../../../../shared/forms/input/selectable-option.model';
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
  employerFormValue: EmployerFormValue;

  employer: FormGroup;

  countryOptions$: Observable<SelectableOption[]>;

  countryIsoCode$: Observable<String>;

  constructor(private isoCountryService: IsoCountryService,
              private fb: FormBuilder) {

    this.countryOptions$ = this.isoCountryService.getSortedCountryOptions();
  }

  ngOnInit(): void {
    const { name, countryIsoCode } = this.employerFormValue;

    this.employer = this.fb.group({
      name: [name, [
        Validators.required,
        Validators.maxLength(this.NAME_MAX_LENGTH)
      ]],
      countryIsoCode: [countryIsoCode]
    });

    this.parentForm.addControl(JobPublicationFormValueKeys.EMPLOYER, this.employer);

    this.countryIsoCode$ = this.employer.get('countryIsoCode').valueChanges
      .pipe(
        filter((value) => !!value),
        startWith(countryIsoCode),
      );
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl(JobPublicationFormValueKeys.EMPLOYER);
  }
}
