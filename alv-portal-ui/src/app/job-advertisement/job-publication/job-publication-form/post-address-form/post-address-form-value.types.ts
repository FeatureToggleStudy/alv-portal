import { IsoCountryService } from '../../../../shared/localities/iso-country.service';
import {
  emptyZipCityFormValue,
  ZipCityFormValue
} from '../../../../shared/forms/input/zip-city-input/zip-city-form-value.types';

export interface PostAddressFormValue {
  name: string;
  houseNumber: string;
  countryIsoCode: string;
  postOfficeBoxNumberOrStreet: {
    street?: string;
    postOfficeBoxNumber?: string;
  };
  zipAndCity: ZipCityFormValue;
}

export function emptyPostAddressFormValue(): PostAddressFormValue {
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
