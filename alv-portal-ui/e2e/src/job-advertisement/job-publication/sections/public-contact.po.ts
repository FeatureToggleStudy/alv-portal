import { $ } from 'protractor';
import { alvFormControlName } from '../selector-utils';

export class PublicContactPo {
  private sectionElementFinder = $('alv-public-contact');

  get btnCopy() {
    return $('#job-publication-public-contact').$('button');
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
