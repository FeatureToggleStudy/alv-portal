import { ZipCityFormValue } from './zip-city-form-value.types';
import { IsoCountryService } from '../../../localities/iso-country.service';
import { ZipAndCityTypeaheadItem } from '../../../localities/zip-and-city-typeahead-item';

export function mapToPostalCodeAndCity(zipCityFormValue: ZipCityFormValue): { postalCode: string, city: string } {
  if (!zipCityFormValue) {
    return null;
  }
  if (zipCityFormValue.zipCityAutoComplete) {
    const zipAndCity = zipCityFormValue.zipCityAutoComplete.payload;

    return {
      city: zipAndCity.city,
      postalCode: zipAndCity.zipCode
    };
  }

  return {
    city: zipCityFormValue.city,
    postalCode: zipCityFormValue.zipCode
  };
}

/**
 * creates a typeahead item for switzerland and fills the zipInput. For other countries doesn't do anything
 * @param zipAndCity
 * @param countryIsoCode
 */
export function createInitialZipAndCityFormValue(zipAndCity: ZipCityFormValue = {zipCode: '', city: ''},
  countryIsoCode: string): ZipCityFormValue {
  const {zipCode, city} = zipAndCity;

  if (countryIsoCode === IsoCountryService.ISO_CODE_SWITZERLAND && zipCode && city) {
    const label = zipCode + ' ' + city;
    return {
      ...zipAndCity,
      zipCityAutoComplete: new ZipAndCityTypeaheadItem({zipCode, city}, label, 0) //fixme maybe this logic should reside in zip input instead, because there's no reason WorkEffort should know about typeahead items.
    };
  }
  return zipAndCity;
}
