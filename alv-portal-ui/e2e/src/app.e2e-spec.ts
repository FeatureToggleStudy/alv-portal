import {AppPage} from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display browser title', () => {
    page.navigateTo();
    expect(page.getBrowserTitle()).toEqual('ALV Online Services');
  });
});
