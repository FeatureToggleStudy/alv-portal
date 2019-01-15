import { IsoCountryService } from '../iso-country.service';
import { ZipCityFormValue } from '../zip-city-input/zip-city-form-value.types';

export interface LocationFormValue {
  countryIsoCode: string;
  remarks: string;
  zipAndCity: ZipCityFormValue;
}

export const emptyLocationFormValue: LocationFormValue = {
  countryIsoCode: IsoCountryService.ISO_CODE_SWITZERLAND,
  remarks: null,
  zipAndCity: {
    zipCode: null,
    city: null,
  }
};
