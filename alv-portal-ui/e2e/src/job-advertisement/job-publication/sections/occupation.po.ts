import { $ } from 'protractor';
import { alvFormControlName } from '../selector-utils';

export class OccupationPo {
  private sectionElementFinder = $('alv-occupation');

  get occupation() {
    return this.sectionElementFinder.$(alvFormControlName('occupationSuggestion')).$('input');
  }

  get qualification() {
    return this.sectionElementFinder.$(alvFormControlName('qualification')).$('select');
  }

  get degree() {
    return this.sectionElementFinder.$(alvFormControlName('degree')).$('select');
  }

  get experience() {
    return this.sectionElementFinder.$(alvFormControlName('experience')).$('select');
  }
}
