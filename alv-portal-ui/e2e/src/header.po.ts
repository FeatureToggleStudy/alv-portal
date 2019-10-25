import { getByTest } from './job-advertisement/job-publication/selector-utils';
import { promise as wdpromise } from 'selenium-webdriver';
import { $ } from 'protractor';

export class HeaderPo {
  private elementFinder = $('alv-header');

  get loginRegisterButton() {
    return this.elementFinder.$(getByTest('loginRegister'));
  }

  setLanguage(languageCode): wdpromise.Promise<any> {
    return this.elementFinder.$(getByTest('language-switcher' + languageCode)).click();
  }
}
