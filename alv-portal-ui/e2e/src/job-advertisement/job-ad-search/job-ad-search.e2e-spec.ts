import { JobSearchPo } from './job-search.po';


describe('Job search page', () => {
  let page: JobSearchPo;

  beforeEach(() => {
    page = new JobSearchPo();
  });

  it('should navigate to the job-search page', () => {
    page.navigateTo();
    expect(page.browserTitle).toEqual('Search job');
  });

  it('should have some results with empty search query', () => {
    //browser.sleep(3000).then();
    page.filterPanel.resultCount.getText().then(resultCount => expect(parseInt(resultCount, 0)).toBeGreaterThan(0));
  });
});

