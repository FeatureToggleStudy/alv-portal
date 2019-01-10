import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as countries from 'i18n-iso-countries';
import { Observable } from 'rxjs/index';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { I18nService } from '../../../core/i18n.service';
import { map } from 'rxjs/internal/operators';
import { LocalitySuggestionService } from '../../../shared/localities/locality-suggestion.service';
import { LocalityMultiTypeaheadItem } from '../../../shared/localities/locality-multi-typeahead-item';

@Component({
  selector: 'alv-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  readonly CITY_MAX_LENGTH = 100;

  readonly ZIP_CODE_REGEX = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i;

  readonly REMARK_MAX_LENGTH = 50;


  @Input()
  parentForm: FormGroup;

  locationGroup: FormGroup;

  countryOptions$: Observable<SelectableOption[]>;

  loadLocationsFn = this.loadLocations.bind(this);


  constructor(private fb: FormBuilder,
              private localitySuggestionService: LocalitySuggestionService,
              private i18nService: I18nService) {
  }

  ngOnInit(): void {
    this.locationGroup = this.buildLocationGroup();
    this.parentForm.addControl('location', this.locationGroup);
    this.countryOptions$ = this.initCountryOptions();
    this.locationGroup.get('countryIsoCode').valueChanges.subscribe(value => {
      this.initCityAndZipComponents(this.locationGroup);
    })
  }

  public isCityZipAutocomplete() {
    return this.locationGroup.get('countryIsoCode').value === 'CH';
  }

  private buildLocationGroup(): FormGroup {
    const locationGroup = this.fb.group({
      countryIsoCode: ['CH', []],
      remarks: ['', [
        Validators.maxLength(this.REMARK_MAX_LENGTH)
      ]],
    });
    this.initCityAndZipComponents(locationGroup);

    return locationGroup;
  }


  private initCountryOptions(): Observable<SelectableOption[]> {
    countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
    countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));
    countries.registerLocale(require('i18n-iso-countries/langs/de.json'));
    countries.registerLocale(require('i18n-iso-countries/langs/it.json'));

    return this.i18nService.currentLanguage$.pipe(map(
      (lang: string) => {
        const countryNames = countries.getNames(lang);
        return Object.keys(countryNames)
          .map((value) => ({ value, label: countryNames[value] }));
      }
    ));
  }

  private loadLocations(query: string): Observable<LocalityMultiTypeaheadItem[]> {
    return this.localitySuggestionService.fetchJobPublicationLocations(query);
  }

  private initCityAndZipComponents(locationGroup: FormGroup) {
    locationGroup.removeControl('zip');
    locationGroup.removeControl('city');
    locationGroup.removeControl('cityAndZip');

    if (locationGroup.get('countryIsoCode').value === 'CH') {
      const cityAndZip = this.fb.control('', [
        Validators.required
      ]);

      locationGroup.addControl('cityAndZip', cityAndZip);

    } else {
      const city = this.fb.control('', [
        Validators.required,
        Validators.maxLength(this.CITY_MAX_LENGTH)
      ]);
      const zip = this.fb.control('', [
        Validators.required,
        Validators.pattern(this.ZIP_CODE_REGEX)
      ]);

      locationGroup.addControl('city', city);
      locationGroup.addControl('zip', zip);
    }
  }
}
