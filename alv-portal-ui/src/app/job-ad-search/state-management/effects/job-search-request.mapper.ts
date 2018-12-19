import { ContractType, JobSearchFilter, Sort } from '../state/job-search-filter.types';
import {
  JobAdvertisementSearchRequest,
  ProfessionCode
} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { OccupationMultiTypeaheadItem } from '../../../shared/occupations/occupation-multi-typeahead-item';
import { SimpleMultiTypeaheadItem } from '../../../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';

const ITEMS_PER_PAGE = 20;

export class JobSearchRequestMapper {

  static mapToRequest(jobSearchFilter: JobSearchFilter, page: number): JobAdvertisementSearchRequest {
    return {
      page: page,
      size: ITEMS_PER_PAGE,
      sort: JobSearchRequestMapper.mapSort(jobSearchFilter.sort),
      body: {
        workloadPercentageMin: jobSearchFilter.workloadPercentageMin,
        workloadPercentageMax: jobSearchFilter.workloadPercentageMax,
        permanent: JobSearchRequestMapper.mapContractType(jobSearchFilter.contractType),
        companyName: jobSearchFilter.company,
        onlineSince: jobSearchFilter.onlineSince,
        displayRestricted: jobSearchFilter.displayRestricted,
        professionCodes: JobSearchRequestMapper.mapProfessionCodes(jobSearchFilter.occupations),
        keywords: JobSearchRequestMapper.mapKeywords(jobSearchFilter.keywords),
        communalCodes: JobSearchRequestMapper.mapCommunalCodes(jobSearchFilter.localities),
      }
    };
  }

  private static mapProfessionCodes(occupationMultiTypeaheadItems: OccupationMultiTypeaheadItem[]): ProfessionCode[] {
    return occupationMultiTypeaheadItems
      .map((occupationMultiTypeaheadItem: OccupationMultiTypeaheadItem) => occupationMultiTypeaheadItem.payload)
      .reduce((previousValue, currentValue) => previousValue.concat(currentValue), []);
  }

  private static mapContractType(contractType: ContractType): boolean | null {
    if (contractType === ContractType.PERMANENT) {
      return true;
    } else if (contractType === ContractType.TEMPORARY) {
      return false;
    } else {
      return null;
    }
  }

  private static mapSort(sort: Sort): string {
    if (sort === Sort.DATE_ASC) {
      return 'date_asc';
    } else if (sort === Sort.DATE_DESC) {
      return 'date_desc';
    } else {
      return 'score';
    }
  }


  private static mapKeywords(keywords: SimpleMultiTypeaheadItem[]): string[] {
    return keywords.map((i) => i.payload)
  }

  private static mapCommunalCodes(localities: SimpleMultiTypeaheadItem[]): string[] {
    return localities.map((i) => i.payload)
  }
}
