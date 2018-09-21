import {browser} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getBrowserTitle() {
    return browser.getTitle();
  }
}
