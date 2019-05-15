import { promise as wdpromise } from 'selenium-webdriver';
import { $, ElementArrayFinder, ElementFinder } from 'protractor';
import { getByTest } from '../../job-publication/selector-utils';

export class SearchResultsPanelPo {
  private sectionElementFinder = $('.main-column');

  get results(): ElementArrayFinder {
    return this.sectionElementFinder.$$('alv-job-search-result');
  }

  get resultCount(): wdpromise.Promise<number> {
    return this.results.then((results: ElementFinder[]) => results.length);
  }

  async getResultHeaders(): wdpromise.Promise<string[]> {
    return this.sectionElementFinder.$$(getByTest('resultTitle'))
      .then((results: ElementFinder[]) => Promise.all(results.map(r=>r.getText())));
  }

  async clickOnResult(numberOfResult) {
    const results = await this.results;
    return results[numberOfResult].click();
  }
}

