import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/index';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { IsoCountryService } from '../iso-country.service';
import { filter, startWith } from 'rxjs/internal/operators';
import { LocationFormValue } from './location-form-value.types';
import { JobPublicationFormValueKeys } from '../job-publication-form-value.types';

@Component({
  selector: 'alv-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent extends AbstractSubscriber implements OnInit {

  readonly REMARK_MAX_LENGTH = 50;

  @Input()
  parentForm: FormGroup;

  @Input()
  set locationFormValue(value: LocationFormValue) {
    this._locationFormValue = value;
    this.setFormValue(value);
  }

  get locationFormValue() {
    return this._locationFormValue;
  }

  private _locationFormValue: LocationFormValue;

  location: FormGroup;

  countryOptions$: Observable<SelectableOption[]>;

  countryIsoCode$: Observable<String>;

  constructor(private fb: FormBuilder,
              private isoCountryService: IsoCountryService) {
    super();

    this.countryOptions$ = this.isoCountryService.countryOptions$;

    this.location = this.fb.group({
      countryIsoCode: [null],
      remarks: [null, [
        Validators.maxLength(this.REMARK_MAX_LENGTH)
      ]]
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl(JobPublicationFormValueKeys.location, this.location);

    const countryIsoCode = this.location.get('countryIsoCode');
    this.countryIsoCode$ = countryIsoCode.valueChanges
      .pipe(
        filter((value) => !!value),
        startWith(countryIsoCode.value),
      );
  }

  private setFormValue(value: LocationFormValue) {
    const { countryIsoCode, remarks } = value;
    this.location.patchValue({ countryIsoCode, remarks }, { emitEvent: false });
  }
}
