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
  let searchPage: JobSearchPo;

  beforeEach(() => {
    searchPage = new JobSearchPo();
    searchPage.navigateTo();
  });

  it('should navigate to the job-search searchPage', () => {
    expect(searchPage.browserTitle).toEqual('Search job');
  });

  it('should have some more than 0 results with empty search query', () => {
    expect(searchPage.filterPanel.isResultCountPresent).toBe(true, 'the result counter is not rendered at all');
    expect(searchPage.filterPanel.resultCount).toBeGreaterThan(0, 'the result counter is more than 0'); // parseInt will cut everything after . character, so if in English locale big number are written like this '85.111' instead of this '85'111', the result won't be precise. We don't care about that here though.
    expect(searchPage.searchResultsPanel.resultCount).toBe(PAGE_SIZE);
  });

  it('should have working pagination', () => {
    searchPage.scrollToBottom()
      .then(() => {
        expect(searchPage.searchResultsPanel.resultCount).toBe(PAGE_SIZE * 2, 'the amount of results fetched after pagination is not two pages');
      });
  });

  it('should decrease the amount of found jobs when the filters is applied', async () => {
    const initialCount = await getResultCount(searchPage);
    await searchPage.filterPanel.setContractType(ContractTypes.TEMPORARY);
    const filteredByContractTypeCount = await getResultCount(searchPage);
    expect(filteredByContractTypeCount).toBeLessThan(initialCount);
    await searchPage.filterPanel.setCompany('GmbH');
    const filteredByCompanyCount = await getResultCount(searchPage);
    expect(filteredByCompanyCount).toBeLessThan(filteredByContractTypeCount);
  });

  it('should perform search by the criteria in the upper panel', async () => {
    const initialCount = await getResultCount(searchPage);
    await searchPage.mainFilterPanel.fillOccupation('pro');
    await browser.sleep(DEFAULT_SLEEP_TIME);
    const afterFilter = await getResultCount(searchPage);
    expect(afterFilter).toBeLessThan(initialCount);
  });

  it('should go to a details searchPage and navigate to next search results', async () => {
    const resultsHeaders = await searchPage.searchResultsPanel.getResultHeaders();
    await searchPage.searchResultsPanel.clickOnResult(0);
    const detailsPage = new JobDetailsPo();

    //check that all headers match the search results headers
    for (const resultHeader of resultsHeaders) {
      await expect(detailsPage.header).toBe(resultHeader);
      await detailsPage.nextButton.click();
    }
    //we've reached the last result header and the new ones have to be loaded now. The next button must be clickable

    await expect(detailsPage.nextButton.isEnabled()).toBe(true, 'The next button must be clickable after iterating through the first searchPage of results');

    await detailsPage.goBackToSearch();
    await expect(searchPage.searchResultsPanel.results.$$('.visited').count()).toBe(21, 'must be 21 visited search results');

  });

  it('should navigate from the last to the first search result normally', async () => {
    await searchPage.scrollToBottom();
    await browser.sleep(DEFAULT_SLEEP_TIME);
    const resultHeaders = await searchPage.searchResultsPanel.getResultHeaders();
    await expect(resultHeaders.length).toBe(40);

    await searchPage.scrollToBottom();
    //now let's go back from the 40th result to a 0th result
    await searchPage.searchResultsPanel.clickOnResult(39);

    const detailsPage = new JobDetailsPo();

    for (const resultHeader of resultHeaders.reverse()) {
      await expect(detailsPage.header).toBe(resultHeader);
      await detailsPage.previousButton.click();
    }

    await expect(detailsPage.previousButton.isEnabled()).toBeFalsy();

    await detailsPage.goBackToSearch();
    await expect(searchPage.searchResultsPanel.results.$$('.visited').count()).toBe(40);
  });

  it('should disable previous and next buttons if we reload the details searchPage', async () => {
    await searchPage.searchResultsPanel.clickOnResult(1);
    const detailsPage = new JobDetailsPo();
    expect(detailsPage.previousButton.isEnabled()).toBe(true);
    expect(detailsPage.nextButton.isEnabled()).toBe(true);
    await browser.refresh();
    expect(detailsPage.previousButton.isEnabled()).toBe(false);
    expect(detailsPage.nextButton.isEnabled()).toBe(false);
  });

});

