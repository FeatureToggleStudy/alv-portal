import { browser, promise as wdpromise } from 'protractor';

export function scrollToBottom(): wdpromise.Promise<void> {
  return browser.executeScript('window.scrollTo(0, document.body.scrollHeight*2)');
}
