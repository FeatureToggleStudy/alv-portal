import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsoCountryService } from '../iso-country.service';
import { LocalitySuggestionService } from '../../../shared/localities/locality-suggestion.service';
import { Observable } from 'rxjs/index';
import { ZipCityFormValue } from './zip-city-form-value.types';
import { TypeaheadItem } from '../../../shared/forms/input/typeahead/typeahead-item';
import { ZipAndCity } from '../../../shared/localities/zip-and-city-typeahead-item';


@Component({
  selector: 'alv-zip-city-input',
  templateUrl: './zip-city-input.component.html',
  styleUrls: ['./zip-city-input.component.scss']
})
export class ZipCityInputComponent implements OnInit {

  readonly CITY_MAX_LENGTH = 100;

  readonly ZIP_CODE_MAX_LENGTH = 12;

  @Input()
  parentForm: FormGroup;

  @Input()
  set countryIsoCode(countryIsoCode: string) {

    this._countryIsoCode = countryIsoCode;
    if (this.zipAndCity) {
      this.toggleAutocomplete(countryIsoCode);
    }
  }

  @Input()
  zipCityFormValue: ZipCityFormValue;

  zipAndCity: FormGroup;

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
    const { zipCityAutoComplete, zipCode, city } = this.zipCityFormValue;

    this.zipAndCity = this.fb.group({
      zipCityAutoComplete: [zipCityAutoComplete, [
        Validators.required
      ]],
      zipCode: [zipCode, [
        Validators.required,
        Validators.maxLength(this.ZIP_CODE_MAX_LENGTH)
      ]],
      city: [city, [
        Validators.required,
        Validators.maxLength(this.CITY_MAX_LENGTH)
      ]]
    });

    this.parentForm.addControl('zipAndCity', this.zipAndCity);
    this.toggleAutocomplete(this._countryIsoCode);
  }

  public isCityZipAutocomplete() {
    return ZipCityInputComponent.isCityZipAutocomplete(this._countryIsoCode);
  }

  private toggleAutocomplete(selectedCountryIsoCode: string) {
    const zipCityAutoCompleteControl = this.zipAndCity.get('zipCityAutoComplete');
    const zipCodeControl = this.zipAndCity.get('zipCode');
    const cityControl = this.zipAndCity.get('city');

    if (ZipCityInputComponent.isCityZipAutocomplete(selectedCountryIsoCode)) {
      zipCityAutoCompleteControl.enable();

      zipCodeControl.disable();
      cityControl.disable();
    } else {
      zipCityAutoCompleteControl.disable();

      zipCodeControl.enable();
      cityControl.enable();
    }
  }
}
