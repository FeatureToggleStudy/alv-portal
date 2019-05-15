import { JobSearchPo } from './job-search.po';
import { ContractTypes } from './sections/filter-panel.po';
import { browser } from 'protractor';
import { DEFAULT_SLEEP_TIME } from '../../constants';
import { JobDetailsPo } from './job-details.po';

const PAGE_SIZE = 20;

function getResultCount(page: JobSearchPo) {
  return page.filterPanel.resultCount;
}

describe('Job search page', () => {
  let page: JobSearchPo;

  beforeEach(() => {
    page = new JobSearchPo();
    page.navigateTo();
  });

  it('should navigate to the job-search page', () => {
    expect(page.browserTitle).toEqual('Search job');
  });

  it('should have some more than 0 results with empty search query', () => {
    expect(page.filterPanel.isResultCountPresent).toBe(true, 'the result counter is not rendered at all');
    expect(page.filterPanel.resultCount).toBeGreaterThan(0, 'the result counter is more than 0'); // parseInt will cut everything after . character, so if in English locale big number are written like this '85.111' instead of this '85'111', the result won't be precise. We don't care about that here though.
    expect(page.searchResultsPanel.resultCount).toBe(PAGE_SIZE);
  });

  it('should have working pagination', () => {
    page.scrollToBottom()
      .then(() => {
        expect(page.searchResultsPanel.resultCount).toBe(PAGE_SIZE * 2, 'the amount of results fetched after pagination is not two pages');
      });
  });

  it('should decrease the amount of found jobs when the filters is applied', async () => {
    const initialCount = await getResultCount(page);
    await page.filterPanel.setContractType(ContractTypes.TEMPORARY);
    const filteredByContractTypeCount = await getResultCount(page);
    expect(filteredByContractTypeCount).toBeLessThan(initialCount);
    await page.filterPanel.setCompany('GmbH');
    const filteredByCompanyCount = await getResultCount(page);
    expect(filteredByCompanyCount).toBeLessThan(filteredByContractTypeCount);
  });

  it('should perform search by the criteria in the upper panel', async () => {
    const initialCount = await getResultCount(page);
    await page.mainFilterPanel.fillOccupation('pro');
    await browser.sleep(DEFAULT_SLEEP_TIME);
    const afterFilter = await getResultCount(page);
    expect(afterFilter).toBeLessThan(initialCount);
  });

  it('should go to a details page and navigate to next search results', async () => {
    const resultsHeaders = await page.searchResultsPanel.getResultHeaders();
    await page.searchResultsPanel.clickOnResult(0);
    const detailsPage = new JobDetailsPo();

    //check that all headers match the search results headers
    for (const resultHeader of resultsHeaders) {
      await expect(detailsPage.header).toBe(resultHeader);
      await detailsPage.nextButton.click();
    }
    //we've reached the last result header and the new ones have to be loaded now. The next button must be clickable

    await expect(detailsPage.nextButton.isEnabled()).toBe(true, 'The next button must be clickable after iterating through the first page of results');

    await detailsPage.goBackToSearch();
    await expect(page.searchResultsPanel.results.$$('.visited').count()).toBe(21, 'must be 21 visited search results');

  });

  it('should navigate from the last to the first search result normally', async () => {
    await page.scrollToBottom();
    const resultHeaders = await page.searchResultsPanel.getResultHeaders();
    await expect(resultHeaders.length).toBe(40);

    await page.scrollToBottom();
    //now let's go back from the 40th result to a 0th result
    await page.searchResultsPanel.clickOnResult(39);

    const detailsPage = new JobDetailsPo();

    for (const resultHeader of resultHeaders.reverse()) {
      await expect(detailsPage.header).toBe(resultHeader);
      await detailsPage.previousButton.click();
    }

    await expect(detailsPage.previousButton.isEnabled()).toBeFalsy();

    await detailsPage.goBackToSearch();
    await expect(page.searchResultsPanel.results.$$('.visited').count()).toBe(40);
  });

});

