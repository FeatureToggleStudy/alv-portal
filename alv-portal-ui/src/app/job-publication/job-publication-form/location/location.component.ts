import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as countries from 'i18n-iso-countries';
import { Observable } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { I18nService } from '../../../core/i18n.service';
import { map, takeUntil } from 'rxjs/internal/operators';
import { LocalitySuggestionService } from '../../../shared/localities/locality-suggestion.service';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { SingleTypeaheadItem } from '../../../shared/forms/input/single-typeahead/single-typeahead-item.model';
import { CityZip } from '../../../shared/backend-services/shared.types';

@Component({
  selector: 'alv-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent extends AbstractSubscriber implements OnInit {

  readonly CITY_MAX_LENGTH = 100;

  readonly ZIP_CODE_REGEX = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i;

  readonly REMARK_MAX_LENGTH = 50;

  readonly ISO_CODE_SWITZERLAND = 'CH';

  @Input()
  parentForm: FormGroup;

  countryOptions$: Observable<SelectableOption[]>;

  loadLocationsFn = this.loadLocations.bind(this);

  constructor(private fb: FormBuilder,
              private localitySuggestionService: LocalitySuggestionService,
              private i18nService: I18nService) {
    super();
  }

  ngOnInit(): void {
    this.countryOptions$ = this.initCountryOptions();
    this.parentForm.addControl('location', this.buildLocationGroup());

    this.countryIsoCode.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.locationGroup.setControl('zipAndCity', this.buildCityAndZip(value)));
  }

  public isCityZipAutocomplete() {
    return this._isCityZipAutocomplete(this.countryIsoCode.value);
  }

  private _isCityZipAutocomplete(selectedCountryIsoCode: string) {
    return selectedCountryIsoCode === this.ISO_CODE_SWITZERLAND;
  }

  private initCountryOptions(): Observable<SelectableOption[]> {
    countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
    countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));
    countries.registerLocale(require('i18n-iso-countries/langs/de.json'));
    countries.registerLocale(require('i18n-iso-countries/langs/it.json'));

    return this.i18nService.currentLanguage$.pipe(
      map((lang: string) => {
          const countryNames = countries.getNames(lang);
          return Object.keys(countryNames)
            .map((value) => ({ value, label: countryNames[value] }));
        }
      ));
  }

  private buildLocationGroup(): FormGroup {
    return this.fb.group({
      countryIsoCode: [this.ISO_CODE_SWITZERLAND],
      remarks: ['', [
        Validators.maxLength(this.REMARK_MAX_LENGTH)
      ]],
      zipAndCity: this.buildCityAndZip(this.ISO_CODE_SWITZERLAND)
    });
  }

  private buildCityAndZip(selectedCountryIsoCode: string): AbstractControl {

    if (this._isCityZipAutocomplete(selectedCountryIsoCode)) {
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

  private loadLocations(query: string): Observable<SingleTypeaheadItem<CityZip>[]> {
    return this.localitySuggestionService.fetchJobPublicationLocations(query);
  }

  get countryIsoCode() {
    return this.locationGroup.get('countryIsoCode');
  }

  get locationGroup(): FormGroup {
    return <FormGroup>this.parentForm.get('location');
  }
}
