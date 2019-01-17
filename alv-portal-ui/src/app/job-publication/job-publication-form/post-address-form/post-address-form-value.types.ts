import { IsoCountryService } from '../iso-country.service';
import { ZipCityFormValue } from '../zip-city-input/zip-city-form-value.types';

export interface PostAddressFormValue {
  name: string;
  houseNumber: string;
  countryIsoCode: string;
  postOfficeBoxNumberOrStreet: {
    street?: string;
    postOfficeBoxNumber?: number;
  };
  zipAndCity: ZipCityFormValue;
}

export const emptyPostAddressFormValue: PostAddressFormValue = {
  name: null,
  countryIsoCode: IsoCountryService.ISO_CODE_SWITZERLAND,
  houseNumber: null,
  postOfficeBoxNumberOrStreet: {
    street: null,
    postOfficeBoxNumber: null
  },
  zipAndCity: null
};
