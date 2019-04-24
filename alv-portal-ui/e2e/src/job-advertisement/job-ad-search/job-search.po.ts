import { $, browser } from 'protractor';
import { SearchPanelPo } from './sections/search-panel.po';
import { FilterPanelPo } from './sections/filter-panel.po';


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
