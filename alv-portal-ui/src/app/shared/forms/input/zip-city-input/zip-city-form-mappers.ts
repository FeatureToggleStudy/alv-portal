import { ZipCityFormValue } from './zip-city-form-value.types';

export function mapToPostalCodeAndCity(zipCityFormValue: ZipCityFormValue): { postalCode: string, city: string } {
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
