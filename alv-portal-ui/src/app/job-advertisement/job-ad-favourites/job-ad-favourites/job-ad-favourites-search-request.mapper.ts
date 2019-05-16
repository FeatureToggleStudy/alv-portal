import { JobAdFavouritesSearchRequest } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobAdFavouritesSearchFilter } from '../state-management/state';

const DEFAULT_ITEMS_PER_PAGE = 150;

export class JobAdFavouritesSearchRequestMapper {

  static mapToRequest(filter: JobAdFavouritesSearchFilter, page: number, resultSize = DEFAULT_ITEMS_PER_PAGE): JobAdFavouritesSearchRequest {
    return {
      body: {
        query: filter.query
      },
      page: page,
      size: resultSize
    };
  }

}

