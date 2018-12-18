import { ContractType, JobSearchFilter, Sort } from '../state/job-search-filter.types';
import {
  JobAdvertisementSearchRequest,
  ProfessionCode
} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { OccupationMultiTypeaheadItem } from '../../occupation-multi-typeahead-item';

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
        professionCodes: JobSearchRequestMapper.mapProfessionCodes(jobSearchFilter.occupations)
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


}
