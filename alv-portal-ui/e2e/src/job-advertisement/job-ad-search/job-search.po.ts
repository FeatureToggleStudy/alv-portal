import { $, browser, promise as wdpromise } from 'protractor';
import { SearchResultsPanelPo } from './sections/search-results-panel.po';
import { FilterPanelPo } from './sections/filter-panel.po';
import { MainFilterPanelPo } from './sections/main-filter-panel.po';
import { scrollToBottom } from "../../utils";
import {DEFAULT_SLEEP_TIME} from "../../constants";


export class JobSearchPo {
  private jobSearchComponentElementFinder = $('alv-job-search');

  searchResultsPanel = new SearchResultsPanelPo();
  mainFilterPanel = new MainFilterPanelPo();
  filterPanel = new FilterPanelPo();


  navigateTo() {
    return browser.get('/job-search');
  }

  scrollToBottom(): wdpromise.Promise<void>  {
    return scrollToBottom()
      .then(x => browser.sleep(DEFAULT_SLEEP_TIME));
  }

  get browserTitle() {
    return browser.getTitle();
  }

}
