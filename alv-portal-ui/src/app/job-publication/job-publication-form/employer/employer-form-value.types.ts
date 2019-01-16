import { ZipCityFormValue } from '../zip-city-input/zip-city-form-value.types';
import { IsoCountryService } from '../iso-country.service';

export interface EmployerFormValue {
  name: string;
  countryIsoCode: string;
  zipAndCity: ZipCityFormValue;
}

export const emptyEmployerFormValue: EmployerFormValue = {
  name: null,
  countryIsoCode: IsoCountryService.ISO_CODE_SWITZERLAND,
  zipAndCity: null
};
