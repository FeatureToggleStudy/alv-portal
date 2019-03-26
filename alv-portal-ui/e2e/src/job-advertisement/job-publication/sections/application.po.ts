import { $ } from 'protractor';
import { alvFormControlName } from '../selector-utils';

export class ApplicationPo {
  private sectionElementFinder = $('alv-application');

  get form() {
    return this.sectionElementFinder.$(alvFormControlName('form')).$('input');
  }

  get formUrl() {
    return this.sectionElementFinder.$(alvFormControlName('formUrl')).$('input');
  }

  get email() {
    return this.sectionElementFinder.$(alvFormControlName('email')).$('input');
  }

  get phone() {
    return this.sectionElementFinder.$(alvFormControlName('phone')).$('input');
  }

  get post() {
    return this.sectionElementFinder.$(alvFormControlName('post')).$('input');
  }

  get additionalInfo() {
    return this.sectionElementFinder.$(alvFormControlName('additionalInfo')).$('textArea');
  }

}
