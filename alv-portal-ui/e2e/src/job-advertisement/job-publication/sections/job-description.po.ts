import { $ } from 'protractor';
import { alvFormControlName } from '../selector-utils';

export class JobDescriptionPo {
  private sectionElementFinder = $('alv-job-description');

  get jobTitle() {
    return this.sectionElementFinder.$(alvFormControlName('title')).$('input');
  }

  get numberOfJobs() {
    return this.sectionElementFinder.$(alvFormControlName('numberOfJobs')).$('input');
  }

  get jobDescription() {
    return this.sectionElementFinder.$(alvFormControlName('jobDescription')).$('textarea');
  }
}
