import { $, browser } from 'protractor';

export class JobSearchPo {
  private jobSearchComponentElementFinder = $('alv-job-search');

  searchPanel = new SearchPanelPo();
  filterPanel = new FilterPanelPo();

  navigateTo() {
    return browser.get('/job-search');
  }

  get browserTitle() {
    return browser.getTitle();
  }
}
