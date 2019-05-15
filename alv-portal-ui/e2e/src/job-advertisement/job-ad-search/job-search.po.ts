import { $, browser, by, element, promise as wdpromise } from 'protractor';
import { SearchResultsPanelPo } from './sections/search-results-panel.po';
import { FilterPanelPo } from './sections/filter-panel.po';
import { MainFilterPanelPo } from './sections/main-filter-panel.po';
import { scrollToBottom } from '../../utils';
import { DEFAULT_SLEEP_TIME, LONG_SLEEP_TIME } from '../../constants';


export class JobSearchPo {
  private jobSearchComponentElementFinder = $('alv-job-search');

  searchResultsPanel = new SearchResultsPanelPo();
  mainFilterPanel = new MainFilterPanelPo();
  filterPanel = new FilterPanelPo();


  navigateTo() {
    return browser.get('/job-search');
  }

  scrollToBottom(): wdpromise.Promise<void> {

    element(by.css('.language-switch-button')).click();
    // this is funny but I need to click somewhere on a page
    // to bring focus to window, so that we could scroll it
    return scrollToBottom()
      .then(() => browser.sleep(LONG_SLEEP_TIME));
  }

  get browserTitle() {
    return browser.getTitle();
  }

}
