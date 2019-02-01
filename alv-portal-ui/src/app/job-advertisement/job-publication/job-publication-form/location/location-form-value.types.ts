import { IsoCountryService } from '../iso-country.service';
import {
  emptyZipCityFormValue,
  ZipCityFormValue
} from '../zip-city-input/zip-city-form-value.types';

export interface LocationFormValue {
  countryIsoCode: string;
  remarks: string;
  zipAndCity: ZipCityFormValue;
}

export function emptyLocationFormValue(): LocationFormValue {
  return {
    countryIsoCode: IsoCountryService.ISO_CODE_SWITZERLAND,
    remarks: null,
    zipAndCity: emptyZipCityFormValue()
  };
}
