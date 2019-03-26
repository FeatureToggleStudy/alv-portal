import { $ } from 'protractor';
import { alvFormControlName } from '../selector-utils';

export class LanguagesPo {
  private sectionElementFinder = $('alv-languages');

  get languageIsoCodes() {
    return this.sectionElementFinder.$$(alvFormControlName('languageIsoCode')).$$('select');
  }

  get spokenLevels() {
    return this.sectionElementFinder.$$(alvFormControlName('spokenLevel')).$$('select');
  }

  get writtenLevels() {
    return this.sectionElementFinder.$$(alvFormControlName('writtenLevel')).$$('select');
  }
}
