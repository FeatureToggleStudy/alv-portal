import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IsoCountryService } from '../iso-country.service';
import { LocalitySuggestionService } from '../../../shared/localities/locality-suggestion.service';
import { SingleTypeaheadItem } from '../../../shared/forms/input/single-typeahead/single-typeahead-item.model';
import { Observable } from 'rxjs/index';
import { ZipCityFormValue } from './zip-city-form-value.types';

@Component({
  selector: 'alv-zip-city-input',
  templateUrl: './zip-city-input.component.html',
  styleUrls: ['./zip-city-input.component.scss']
})
export class ZipCityInputComponent implements OnInit {

  readonly CITY_MAX_LENGTH = 100;

  readonly ZIP_CODE_REGEX = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i;

  @Input()
  parent: FormGroup;

  @Input()
  set countryIsoCode(countryIsoCode: string) {
    this._countryIsoCode = countryIsoCode;

    if (!!this._countryIsoCode) {
      this.parent.setControl('zipAndCity', this.buildCityAndZip(countryIsoCode));
    }
  }

  @Input()
  set zipCityFormValue(value: ZipCityFormValue) {
    this._zipCityFormValue = value;
    this.setFormValue(value);
  }

  private _countryIsoCode: string;
  private _zipCityFormValue: ZipCityFormValue;


  constructor(private fb: FormBuilder,
              private localitySuggestionService: LocalitySuggestionService) {
  }

  private static isCityZipAutocomplete(selectedCountryIsoCode: string) {
    return selectedCountryIsoCode === IsoCountryService.ISO_CODE_SWITZERLAND;
  }

  loadLocationsFn = (query: string): Observable<SingleTypeaheadItem<ZipCityFormValue>[]> =>
    this.localitySuggestionService.fetchJobPublicationLocations(query)

  ngOnInit(): void {
    this.parent.addControl('zipAndCity', this.buildCityAndZip(this._countryIsoCode));
    this.setFormValue(this._zipCityFormValue);
  }

  public isCityZipAutocomplete() {
    return ZipCityInputComponent.isCityZipAutocomplete(this._countryIsoCode);
  }

  private setFormValue(value: ZipCityFormValue) {
    if (!value) {
      return;
    }

    if (this.zipAndCity instanceof FormGroup) {
      this.zipAndCity.patchValue({ ...value }, { emitEvent: false });
    } else {
      this.zipAndCity.patchValue(value, { emitEvent: false });
    }
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
    return <FormGroup | FormControl>this.parent.get('zipAndCity');
  }
}
