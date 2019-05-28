import { $, browser, promise as wdpromise } from 'protractor';
import { SearchResultsPanelPo } from './sections/search-results-panel.po';
import { FilterPanelPo } from './sections/filter-panel.po';
import { MainFilterPanelPo } from './sections/main-filter-panel.po';
import { scrollToBottom } from '../../utils';
import { LONG_SLEEP_TIME } from '../../constants';
import { getByTest } from '../job-publication/selector-utils';


export class JobSearchPo {
  private jobSearchComponentElementFinder = $('alv-job-search');

  searchResultsPanel = new SearchResultsPanelPo();
  mainFilterPanel = new MainFilterPanelPo();
  filterPanel = new FilterPanelPo();


  navigateTo(): wdpromise.Promise<any> {
    return browser.get('/job-search');
  }

  scrollToBottom(): wdpromise.Promise<void> {

    $(getByTest('language-switcher-en')).click();
    // this is funny but I need to click somewhere on a page
    // to bring focus to window, so that we could scroll it
    return scrollToBottom()
      .then(() => browser.sleep(LONG_SLEEP_TIME));
  }

  get browserTitle() {
    return browser.getTitle();
  }

}
