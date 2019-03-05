import { $ } from 'protractor';
import { alvFormControlName } from '../selector-utils';

export class LocationPo {
  private sectionElementFinder = $('alv-location');


  get countryIsoCode() {
    return this.sectionElementFinder.$(alvFormControlName('countryIsoCode')).$('select');
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

  get remarks() {
    return this.sectionElementFinder.$(alvFormControlName('remarks')).$('textarea');
  }
}
