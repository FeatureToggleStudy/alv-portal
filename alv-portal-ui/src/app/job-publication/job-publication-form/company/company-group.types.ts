import { IsoCountryService } from '../iso-country.service';

export interface CompanyGroup {
  name: string;
  houseNumber: string;
  countryIsoCode: string;
  postOfficeBoxNumberOrStreet: {
    street?: string;
    postOfficeBoxNumber?: string;
  }
}

export const emptyCompanyGroup: CompanyGroup = {
  name: null,
  countryIsoCode: IsoCountryService.ISO_CODE_SWITZERLAND,
  houseNumber: null,
  postOfficeBoxNumberOrStreet: {
    postOfficeBoxNumber: null,
    street: null
  }
};
