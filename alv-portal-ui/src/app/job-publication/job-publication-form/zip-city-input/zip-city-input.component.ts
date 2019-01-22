import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IsoCountryService } from '../iso-country.service';
import { LocalitySuggestionService } from '../../../shared/localities/locality-suggestion.service';
import { Observable } from 'rxjs/index';
import { ZipAndCity, ZipCityFormValue } from './zip-city-form-value.types';
import { TypeaheadItem } from '../../../shared/forms/input/multi-typeahead/typeahead-item';

@Component({
  selector: 'alv-zip-city-input',
  templateUrl: './zip-city-input.component.html',
  styleUrls: ['./zip-city-input.component.scss']
})
export class ZipCityInputComponent implements OnInit {

  readonly CITY_MAX_LENGTH = 100;

  readonly ZIP_CODE_REGEX = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i;

  @Input()
  parentForm: FormGroup;

  @Input()
  set countryIsoCode(countryIsoCode: string) {
    this._countryIsoCode = countryIsoCode;

    if (!!this._countryIsoCode) {
      this.parentForm.setControl('zipAndCity', this.buildCityAndZip(countryIsoCode));
    }
  }

  @Input()
  zipCityFormValue: ZipCityFormValue;

  private _countryIsoCode: string;

  constructor(private fb: FormBuilder,
              private localitySuggestionService: LocalitySuggestionService) {
  }

  private static isCityZipAutocomplete(selectedCountryIsoCode: string) {
    return selectedCountryIsoCode === IsoCountryService.ISO_CODE_SWITZERLAND;
  }

  loadLocationsFn = (query: string): Observable<TypeaheadItem<ZipAndCity>[]> =>
    this.localitySuggestionService.fetchJobPublicationLocations(query)

  ngOnInit(): void {
    this.parentForm.addControl('zipAndCity', this.buildCityAndZip(this._countryIsoCode));
  }

  public isCityZipAutocomplete() {
    return ZipCityInputComponent.isCityZipAutocomplete(this._countryIsoCode);
  }

  private buildCityAndZip(selectedCountryIsoCode: string): FormGroup | FormControl {
    if (ZipCityInputComponent.isCityZipAutocomplete(selectedCountryIsoCode)) {
      return this.fb.control(null, [
        Validators.required
      ]);
    }

    return this.fb.group({
      city: [null, [
        Validators.required,
        Validators.maxLength(this.CITY_MAX_LENGTH)
      ]],
      zipCode: [null, [
        Validators.required,
        Validators.pattern(this.ZIP_CODE_REGEX)
      ]]
    });
  }

  get zipAndCity(): FormGroup | FormControl {
    return <FormGroup | FormControl>this.parentForm.get('zipAndCity');
  }
}
