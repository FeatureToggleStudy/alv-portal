import { $, browser, promise as wdpromise } from 'protractor';
import { SearchPanelPo } from './sections/search-panel.po';
import { FilterPanelPo } from './sections/filter-panel.po';


export class JobSearchPo {
  private jobSearchComponentElementFinder = $('alv-job-search');

  searchPanel = new SearchPanelPo();
  filterPanel = new FilterPanelPo();


  navigateTo() {
    return browser.get('/job-search');
  }

  scrollToBottom(): wdpromise.Promise<void>  {
    return browser.executeScript('window.scrollTo(0, document.body.scrollHeight)')
      .then(x => browser.sleep(2000));
  }

  get browserTitle() {
    return browser.getTitle();
  }
}
