import { JobSearchPo } from './job-search.po';
import { HeaderPo } from '../../header.po';

describe('Job search page for anonymous', () => {
  const searchPage: JobSearchPo;

  beforeEach(() => {
    const header = new HeaderPo();
    header.loginRegisterButton.click();
    // const loginPage = new LoginPo();
    // loginPage.login('iuka-staging-stes-002@yopmail.com', 'Q1w2E3r4')
    //
    // searchPage = new JobSearchPo();
    // searchPage.navigateTo();
  });

  it('should display the logged in user info', () => {
    expect(true).toBe(true);
  });
});
