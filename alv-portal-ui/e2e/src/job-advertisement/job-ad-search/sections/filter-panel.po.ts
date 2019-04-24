import { $ } from 'protractor';
import { getByTest } from '../../job-publication/selector-utils';

export class FilterPanelPo {
  private sectionElementFinder = $('.left-column');

  get resultCount() {
    return this.sectionElementFinder.$(getByTest('resultCount'));
  }
}
