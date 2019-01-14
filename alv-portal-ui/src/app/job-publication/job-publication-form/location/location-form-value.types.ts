import { IsoCountryService } from '../iso-country.service';

export interface LocationFormValue {
  countryIsoCode: string;
  remarks: string;
}

export const emptyLocationFormValue: LocationFormValue = {
  countryIsoCode: IsoCountryService.ISO_CODE_SWITZERLAND,
  remarks: null
};
