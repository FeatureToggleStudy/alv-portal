import { $ } from 'protractor';
import { alvFormControlName } from '../selector-utils';

export class ContactPo {
  private sectionElementFinder = $('alv-contact');

  get languageIsoCode() {
    return this.sectionElementFinder.$(alvFormControlName('languageIsoCode')).$('select');
  }

  get salutation() {
    return this.sectionElementFinder.$(alvFormControlName('salutation')).$('select');
  }

  get firstName() {
    return this.sectionElementFinder.$(alvFormControlName('firstName')).$('input');
  }

  get lastName() {
    return this.sectionElementFinder.$(alvFormControlName('lastName')).$('input');
  }

  get phone() {
    return this.sectionElementFinder.$(alvFormControlName('phone')).$('input');
  }

  get email() {
    return this.sectionElementFinder.$(alvFormControlName('email')).$('input');
  }
}
