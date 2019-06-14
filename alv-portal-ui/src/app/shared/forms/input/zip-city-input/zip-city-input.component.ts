import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsoCountryService } from '../../../localities/iso-country.service';
import { LocalitySuggestionService } from '../../../localities/locality-suggestion.service';
import { Observable } from 'rxjs';
import { TypeaheadItem } from '../typeahead/typeahead-item';
import { ZipAndCity } from '../../../localities/zip-and-city-typeahead-item';
import { ZipCityFormValue } from './zip-city-form-value.types';

@Component({
  selector: 'alv-zip-city-input',
  templateUrl: './zip-city-input.component.html',
  styleUrls: ['./zip-city-input.component.scss']
})
export class ZipCityInputComponent implements OnInit {

  readonly static  CITY_MAX_LENGTH = 100;

  readonly static ZIP_CODE_MAX_LENGTH = 12;

  @Input()
  parentForm: FormGroup;
  @Input()
  zipCityFormValue: ZipCityFormValue;
  zipAndCity: FormGroup;
  static validators = {
    zipCode: Validators.maxLength(ZipCityInputComponent.ZIP_CODE_MAX_LENGTH),
    city: Validators.maxLength(ZipCityInputComponent.CITY_MAX_LENGTH)
  };

  constructor(private fb: FormBuilder,
              private localitySuggestionService: LocalitySuggestionService) {
  }

  private _countryIsoCode: string;

  @Input()
  set countryIsoCode(countryIsoCode: string) {

    this._countryIsoCode = countryIsoCode;
    if (this.zipAndCity) {
      this.toggleAutocomplete(countryIsoCode);
    }
  }

  private static isCityZipAutocomplete(selectedCountryIsoCode: string) {
    return selectedCountryIsoCode === IsoCountryService.ISO_CODE_SWITZERLAND;
  }

  loadLocationsFn = (query: string): Observable<TypeaheadItem<ZipAndCity>[]> =>
    this.localitySuggestionService.fetchJobPublicationLocations(query);

  ngOnInit(): void {
    const {zipCityAutoComplete, zipCode, city} = this.zipCityFormValue;

    this.zipAndCity = this.fb.group({
      zipCityAutoComplete: [zipCityAutoComplete, [
        Validators.required
      ]],
      zipCode: [zipCode, [
        Validators.required,
        ZipCityInputComponent.validators.zipCode
      ]],
      city: [city, [
        Validators.required,
        ZipCityInputComponent.validators.city
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
