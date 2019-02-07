import { inject, TestBed } from '@angular/core/testing';
import 'jasmine-expect';

import { IsoCountryService } from './iso-country.service';
import { of } from 'rxjs';
import { I18nService } from '../../core/i18n.service';
import { SelectableOption } from '../forms/input/selectable-option.model';


describe('IsoCountryService', () => {

  const currentLanguage = 'de';
  const mockI18nService = {
    currentLanguage$: of(currentLanguage)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsoCountryService,
        {provide: I18nService, useValue: mockI18nService}
      ]
    });
  });

  it('should be created', inject([IsoCountryService], (service: IsoCountryService) => {
    expect(service).toBeTruthy();
  }));

  it('should be sorted according to weight list MAIN_COUNTRIES_ISO_CODES_ORDER',
    inject([IsoCountryService], (service: IsoCountryService) => {

      const numberOfCountries = 250;
      let countryOptions: SelectableOption[];

      service.countryOptions$.subscribe((countries: SelectableOption[]) => countryOptions = countries);

      expect(countryOptions).toBeArray();
      expect(countryOptions).toBeArrayOfSize(numberOfCountries);
      expect(countryOptions[0].value).toEqual('CH'); // Switzerland (1)
      expect(countryOptions[1].value).toEqual('LI'); // Liechtenstein (2)
      expect(countryOptions[2].value).toEqual('DE'); // Germany (3)
      expect(countryOptions[3].value).toEqual('FR'); // France (4)
      expect(countryOptions[4].value).toEqual('IT'); // Italy (5)
      expect(countryOptions[5].value).toEqual('AF'); // Afghanistan (next value after weight sort, sorted by localeCompare)
      expect(countryOptions[249].value).toEqual('CY'); // Zypern (last value in the list, sorted by localeCompare)
    }));

});
