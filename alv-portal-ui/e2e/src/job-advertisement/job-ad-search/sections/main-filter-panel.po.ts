import {$, browser} from 'protractor';
import {alvFormControlName} from '../../job-publication/selector-utils';

export class MainFilterPanelPo {
  private sectionElementFinder = $('.query-search-area');

  get occupationsElement() {
    return this.sectionElementFinder.$(alvFormControlName('occupations')).$('input');
  }

  async fillOccupation(occupation: string) {
    await this.occupationsElement.sendKeys(occupation);
    await browser.sleep(1000);
    return $('ngb-typeahead-window button').click();
  }

}
