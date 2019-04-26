import { promise as wdpromise } from 'selenium-webdriver';
import { $, ElementArrayFinder, ElementFinder } from 'protractor';
import {result} from "lodash/index";

export class SearchResultsPanelPo {
  private sectionElementFinder = $('.main-column');

  get results(): ElementArrayFinder {
    return this.sectionElementFinder.$$('alv-job-search-result');
  }

  get resultCount(): wdpromise.Promise<number> {
    return this.results.then((results: ElementFinder[]) => results.length);
  }

  get resultHeaders(): wdpromise.Promise<string[]> {
    return this.results.then((results: ElementFinder[]) => Promise.all(results.map(res => res.getText())));
  }
  //todo not checked yet
  async clickOnResult(number) {
    const results = await this.results;
    return results[number].click();
  }
}

