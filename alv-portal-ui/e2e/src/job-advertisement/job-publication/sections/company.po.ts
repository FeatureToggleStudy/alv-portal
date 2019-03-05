import { $ } from 'protractor';
import { alvFormControlName } from '../selector-utils';

export class CompanyPo {
  private sectionElementFinder = $('alv-company');

  get name() {
    return this.sectionElementFinder.$(alvFormControlName('name')).$('input');
  }

  get street() {
    return this.sectionElementFinder.$(alvFormControlName('street')).$('input');
  }

  get houseNumber() {
    return this.sectionElementFinder.$(alvFormControlName('houseNumber')).$('input');
  }

  get zipCityAutoComplete() {
    return this.sectionElementFinder.$(alvFormControlName('zipCityAutoComplete')).$('input');
  }

  get zipCode() {
    return this.sectionElementFinder.$(alvFormControlName('zipCode')).$('input');
  }

  get city() {
    return this.sectionElementFinder.$(alvFormControlName('city')).$('input');
  }

  get postOfficeBoxNumber() {
    return this.sectionElementFinder.$(alvFormControlName('postOfficeBoxNumber')).$('input');
  }

  get countryIsoCode() {
    return this.sectionElementFinder.$(alvFormControlName('countryIsoCode')).$('select');
  }
}
