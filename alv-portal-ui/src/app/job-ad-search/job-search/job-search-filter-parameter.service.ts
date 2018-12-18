import { Injectable } from '@angular/core';
import { JobSearchFilter } from '../state-management/state/job-search-filter.types';
import { Base64Service } from '../../core/base64.service';
import { OccupationMultiTypeaheadItem } from '../occupation-multi-typeahead-item';

@Injectable()
export class JobSearchFilterParameterService {

  constructor(private base64Service: Base64Service) {
  }

  public encode(jobSearchFilter: JobSearchFilter) {
    return encodeURIComponent(this.base64Service.encode(JSON.stringify(jobSearchFilter)));
  }

  public decode(jobSearchFilterString: string): JobSearchFilter {
    const jobSearchFilter: JobSearchFilter = JSON.parse(this.base64Service.decode(decodeURIComponent(jobSearchFilterString)));
    if (jobSearchFilter.occupations) {
      jobSearchFilter.occupations = jobSearchFilter.occupations
        .map((a) => OccupationMultiTypeaheadItem.fromJson(a));
    }
    return jobSearchFilter;
  }

}
