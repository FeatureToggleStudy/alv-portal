import { Injectable } from '@angular/core';
import { ContractType, Sort } from './job-search.model';

export const ITEMS_PER_PAGE = 20;

@Injectable({
  providedIn: 'root'
})
export class JobSearchRequestMapperService {

  constructor() {
  }

  // TODO map the full search-stuff to a JobAdvertisementSearchRequestBody


  mapContractType(contractType: ContractType): boolean | null {
    let contractTypeFlag;
    if (contractType === ContractType.PERMANENT) {
      contractTypeFlag = true;
    } else if (contractType === ContractType.TEMPORARY) {
      contractTypeFlag = false;
    } else {
      contractTypeFlag = null;
    }
    return contractTypeFlag;
  }

  mapSort(sort: Sort): string {
    let sortArray;
    if (sort === Sort.DATE_ASC) {
      sortArray = ['date_asc'];
    } else if (sort === Sort.DATE_DESC) {
      sortArray = ['date_desc'];
    } else {
      sortArray = ['score'];
    }
    return sortArray;
  }

}
