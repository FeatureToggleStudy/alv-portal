import { $, browser, by, promise as wdpromise } from 'protractor';

export class LoginPo {
  private elementFinder = $('alv-header');

  get usernameInput() {
    return browser.driver.findElement(by.css('input[name=isiwebuserid]'));
  }

  get passwordInput() {
    return browser.driver.findElement(by.css('input[name=isiwebpasswd]'));
  }

  get loginButton() {
    return browser.driver.findElement(by.css('button[value=Login]'));
  }

  login(username, password): wdpromise.Promise<any> {
    this.usernameInput.sendKeys(username);
    this.passwordInput.sendKeys(password);
    return this.loginButton.click();
  }
}
