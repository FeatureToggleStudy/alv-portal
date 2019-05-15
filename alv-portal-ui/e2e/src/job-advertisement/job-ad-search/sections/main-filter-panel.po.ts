import { $, browser } from 'protractor';
import { alvFormControlName } from '../../job-publication/selector-utils';
import { DEFAULT_SLEEP_TIME } from '../../../constants';

export class MainFilterPanelPo {
  private sectionElementFinder = $('.query-search-area');

  get occupationsElement() {
    return this.sectionElementFinder.$(alvFormControlName('occupations')).$('input');
  }

  async fillOccupation(occupation: string) {
    await this.occupationsElement.sendKeys(occupation);
    await browser.sleep(DEFAULT_SLEEP_TIME);
    return $('ngb-typeahead-window button').click();
  }

}
