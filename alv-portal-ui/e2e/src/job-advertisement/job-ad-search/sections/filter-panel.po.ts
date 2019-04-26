import { $, browser, promise as wdpromise } from 'protractor';
import { alvFormControlName, getByTest } from '../../job-publication/selector-utils';

export enum ContractTypes {
  ALL = '0: ALL',
  TEMPORARY = '1: TEMPORARY',
  PERMANENT = '2: PERMANENT'
}

export const SLEEP_TIME = 2000;

export class FilterPanelPo {
  private sectionElementFinder = $('.left-column');

  private get _resultCountElement() {
    return this.sectionElementFinder.$(getByTest('resultCount'));
  }

  get isResultCountPresent(): wdpromise.Promise<boolean> {
    return this._resultCountElement.isPresent();
  }

  get resultCount(): wdpromise.Promise<number> {
    return this._resultCountElement.getText().then(textCount => {
      return parseInt(textCount.replace(/\D/g, ''), 0);
    });
  }

  clickOnOption(value: ContractTypes, selectElement): wdpromise.Promise<void> {
    return selectElement.$(`option[value="${value}"]`).click()
      .then(() => browser.sleep(SLEEP_TIME));
  }

  setContractType(value: ContractTypes) {
    const contractTypeSelect = this.sectionElementFinder.$(alvFormControlName('contractType'));
    return contractTypeSelect.click()
      .then(() => this.clickOnOption(value, contractTypeSelect));
  }

  // todo just sends keys to the input, doesn't clear it first!
  setCompany(employerName: string) {
    return this.sectionElementFinder.$(alvFormControlName('company')).$('input')
      .sendKeys(employerName);
  }
}
