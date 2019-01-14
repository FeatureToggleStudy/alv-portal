import { IsoCountryService } from '../iso-country.service';

export interface CompanyFormValue {
  name: string;
  houseNumber: string;
  countryIsoCode: string;
  postOfficeBoxNumberOrStreet: {
    street?: string;
    postOfficeBoxNumber?: string;
  };
}

export const emptyCompanyFormValue: CompanyFormValue = {
  name: null,
  countryIsoCode: IsoCountryService.ISO_CODE_SWITZERLAND,
  houseNumber: null,
  postOfficeBoxNumberOrStreet: {
    postOfficeBoxNumber: null,
    street: null
  }
};
