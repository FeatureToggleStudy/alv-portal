import { $, browser, ElementFinder, promise as wdpromise } from 'protractor';
import { getByTest } from '../job-publication/selector-utils';

export class JobDetailsPo {
  get nextButton(): ElementFinder {
    return $(getByTest('nextJobAdButton'));
  }

  get previousButton(): ElementFinder {
    return $(getByTest('previousJobAdButton'));
  }

  get header(): wdpromise.Promise<string> {
    return $(getByTest('jobAdHeader')).getText();
  }

  navigateTo(id): wdpromise.Promise<any> {
    return browser.get('/job-search/' + id);
  }

  async getId(): wdpromise.Promise<string> {
    const currentUrl = await browser.getCurrentUrl();
    return currentUrl.replace(/.*\//, '');
  }

  goBackToSearch(): wdpromise.Promise<any> {
    return $(getByTest('backToSearch')).click();
  }
}
