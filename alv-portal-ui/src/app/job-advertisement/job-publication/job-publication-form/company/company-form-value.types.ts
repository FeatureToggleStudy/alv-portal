import { IsoCountryService } from '../iso-country.service';
import {
  emptyZipCityFormValue,
  ZipCityFormValue
} from '../zip-city-input/zip-city-form-value.types';

export interface CompanyFormValue {
  name: string;
  houseNumber: string;
  countryIsoCode: string;
  postOfficeBoxNumberOrStreet: {
    street?: string;
    postOfficeBoxNumber?: string;
  };
  zipAndCity: ZipCityFormValue;
}

export function emptyCompanyFormValue(): CompanyFormValue {
  return {
    name: null,
    countryIsoCode: IsoCountryService.ISO_CODE_SWITZERLAND,
    houseNumber: null,
    postOfficeBoxNumberOrStreet: {
      street: null,
      postOfficeBoxNumber: null
    },
    zipAndCity: emptyZipCityFormValue()
  };
}
