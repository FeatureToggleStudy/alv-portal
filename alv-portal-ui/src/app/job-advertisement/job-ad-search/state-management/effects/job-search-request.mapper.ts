import {
  JobAdvertisementSearchRequest,
  ProfessionCode
} from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { OccupationTypeaheadItem } from '../../../../shared/occupations/occupation-typeahead-item';
import { SimpleTypeaheadItem } from '../../../../shared/forms/input/multi-typeahead/simple-typeahead-item';
import {
  LocalityInputType,
  LocalityTypeaheadItem
} from '../../../../shared/localities/locality-typeahead-item';
import { ContractType, JobSearchFilter, Sort } from '../state';

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
        cantonCodes: JobSearchRequestMapper.mapCantonCodes(jobSearchFilter.localities)
      }
    };
  }

  private static mapProfessionCodes(occupationTypeaheadItems: OccupationTypeaheadItem[]): ProfessionCode[] {
    return occupationTypeaheadItems
      .map((occupationTypeaheadItem: OccupationTypeaheadItem) => occupationTypeaheadItem.payload)
      .map((occupationCode) => {
        const professionalCodes = [{
          type: occupationCode.type,
          value: occupationCode.value
        }];
        if (occupationCode.mapping) {
          professionalCodes.push({
            type: occupationCode.mapping.type,
            value: occupationCode.mapping.value
          });
        }
        return professionalCodes;
      })
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

  private static mapKeywords(keywords: SimpleTypeaheadItem[]): string[] {
    return keywords.map((i) => i.payload);
  }

  private static mapCommunalCodes(localities: LocalityTypeaheadItem[]): string[] {
    return localities
      .filter((i) => i.type === LocalityInputType.LOCALITY)
      .map((i) => i.payload.communalCode);
  }

  private static mapCantonCodes(localities: LocalityTypeaheadItem[]): string[] {
    return localities
      .filter((i) => i.type === LocalityInputType.CANTON)
      .map((i) => i.payload.cantonCode);
  }

}
