import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/index';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { takeUntil } from 'rxjs/internal/operators';
import { LocalitySuggestionService } from '../../../shared/localities/locality-suggestion.service';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { SingleTypeaheadItem } from '../../../shared/forms/input/single-typeahead/single-typeahead-item.model';
import { IsoCountryService } from '../iso-country.service';

@Component({
  selector: 'alv-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent extends AbstractSubscriber implements OnInit {

  readonly CITY_MAX_LENGTH = 100;

  readonly ZIP_CODE_REGEX = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i;

  readonly REMARK_MAX_LENGTH = 50;


  @Input()
  parentForm: FormGroup;

  countryOptions$: Observable<SelectableOption[]>;

  loadLocationsFn = this.loadLocations.bind(this);


  constructor(private fb: FormBuilder,
              private localitySuggestionService: LocalitySuggestionService,
              private isoCountryService: IsoCountryService) {
    super();
    this.countryOptions$ = this.isoCountryService.countryOptions$;
  }

  private static isCityZipAutocomplete(selectedCountryIsoCode: string) {
    return selectedCountryIsoCode === IsoCountryService.ISO_CODE_SWITZERLAND;
  }

  ngOnInit(): void {
    this.parentForm.addControl('location', this.buildLocationGroup());

    this.countryIsoCode.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.locationGroup.setControl('zipAndCity', this.buildCityAndZip(value)));
  }

  public isCityZipAutocomplete() {
    return LocationComponent.isCityZipAutocomplete(this.countryIsoCode.value);
  }

  private buildLocationGroup(): FormGroup {
    return this.fb.group({
      countryIsoCode: [IsoCountryService.ISO_CODE_SWITZERLAND],
      remarks: ['', [
        Validators.maxLength(this.REMARK_MAX_LENGTH)
      ]],
      zipAndCity: this.buildCityAndZip(IsoCountryService.ISO_CODE_SWITZERLAND)
    });
  }

  private buildCityAndZip(selectedCountryIsoCode: string): AbstractControl {

    if (LocationComponent.isCityZipAutocomplete(selectedCountryIsoCode)) {
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
