import {JobSearchPo} from './job-search.po';
import {ContractTypes} from './sections/filter-panel.po';

const PAGE_SIZE = 20;

describe('Job search page', () => {
  let page: JobSearchPo;

  beforeEach(() => {
    page = new JobSearchPo();
  });

  it('should navigate to the job-search page', () => {
    page.navigateTo();
    expect(page.browserTitle).toEqual('Search job');
  });

  it('should have some more than 0 results with empty search query', () => {
    expect(page.filterPanel.isResultCountPresent).toBe(true, 'the result counter is not rendered at all');
    expect(page.filterPanel.resultCount).toBeGreaterThan(0, 'the result counter is more than 0'); // parseInt will cut everything after . character, so if in English locale big number are written like this '85.111' instead of this '85'111', the result won't be precise. We don't care about that here though.
    expect(page.searchPanel.resultCount).toBe(PAGE_SIZE);
  });

  it('should have working pagination', () => {
    page.scrollToBottom().then(() => {
      expect(page.searchPanel.resultCount).toBe(PAGE_SIZE * 2, 'the amount of results fetched after pagination is not two pages');
    });
  });

  it('should decrease the amount of found jobs when the filters is applied', async () => {
    const initial = await page.filterPanel.resultCount;
    await page.filterPanel.setContractType(ContractTypes.TEMPORARY);
    const filteredByContractType = await page.filterPanel.resultCount;
    expect (filteredByContractType).toBeLessThan(initial);
    await page.filterPanel.setCompany('GmbH');
    const filteredByEmployer = page.filterPanel.resultCount;
    expect(filteredByEmployer).toBeLessThan(filteredByContractType);
  });
});

