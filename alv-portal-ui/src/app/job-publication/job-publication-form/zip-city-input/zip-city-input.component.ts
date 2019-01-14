import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsoCountryService } from '../iso-country.service';
import { LocalitySuggestionService } from '../../../shared/localities/locality-suggestion.service';
import { SingleTypeaheadItem } from '../../../shared/forms/input/single-typeahead/single-typeahead-item.model';
import { Observable } from 'rxjs/index';
import { ZipCity } from '../../../shared/backend-services/shared.types';

@Component({
  selector: 'alv-zip-city-input',
  templateUrl: './zip-city-input.component.html',
  styleUrls: ['./zip-city-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZipCityInputComponent implements OnInit {

  readonly CITY_MAX_LENGTH = 100;

  readonly ZIP_CODE_REGEX = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i;

  private _countryIsoCode: string;

  @Input()
  parent: FormGroup;

  @Input()
  set countryIsoCode(countryIsoCode: string) {
    if (!!this._countryIsoCode) {
      this.parent.setControl('zipAndCity', this.buildCityAndZip(countryIsoCode));
    }

    this._countryIsoCode = countryIsoCode;
  }


  constructor(private fb: FormBuilder,
              private localitySuggestionService: LocalitySuggestionService) {
  }

  private static isCityZipAutocomplete(selectedCountryIsoCode: string) {
    return selectedCountryIsoCode === IsoCountryService.ISO_CODE_SWITZERLAND;
  }

  loadLocationsFn = (query: string): Observable<SingleTypeaheadItem<ZipCity>[]> =>
    this.localitySuggestionService.fetchJobPublicationLocations(query)

  ngOnInit(): void {
    this.parent.addControl('zipAndCity', this.buildCityAndZip(this._countryIsoCode));
  }

  public isCityZipAutocomplete() {
    return ZipCityInputComponent.isCityZipAutocomplete(this._countryIsoCode);
  }

  private buildCityAndZip(selectedCountryIsoCode: string): AbstractControl {
    if (ZipCityInputComponent.isCityZipAutocomplete(selectedCountryIsoCode)) {
      return this.fb.control('', [Validators.required]);
    }

    const city = this.fb.control('', [
      Validators.required,
      Validators.maxLength(this.CITY_MAX_LENGTH)
    ]);

    const zipCode = this.fb.control('', [
      Validators.required,
      Validators.pattern(this.ZIP_CODE_REGEX)
    ]);

    return this.fb.group({ city, zipCode });
  }

  get zipAndCityGroup(): FormGroup {
    return <FormGroup>this.parent.get('zipAndCity');
  }

}
