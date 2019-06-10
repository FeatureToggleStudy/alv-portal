import {
  emptyZipCityFormValue,
  ZipCityFormValue
} from '../../../../shared/forms/input/zip-city-input/zip-city-form-value.types';
import { IsoCountryService } from '../../../../shared/localities/iso-country.service';

export interface EmployerFormValue {
  name: string;
  countryIsoCode: string;
  zipAndCity: ZipCityFormValue;
}

export function emptyEmployerFormValue(): EmployerFormValue {
  return {
    name: null,
    countryIsoCode: IsoCountryService.ISO_CODE_SWITZERLAND,
    zipAndCity: emptyZipCityFormValue()
  };
}
