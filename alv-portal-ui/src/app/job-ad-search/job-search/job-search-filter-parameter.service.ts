import { Injectable } from '@angular/core';
import { JobSearchFilter } from '../state-management/state/job-search-filter.types';
import { Base64Service } from '../../core/base64.service';
import { OccupationMultiTypeaheadItem } from '../../shared/occupations/occupation-multi-typeahead-item';
import { SimpleMultiTypeaheadItem } from '../../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';

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
    if (jobSearchFilter.localities) {
      jobSearchFilter.localities = jobSearchFilter.localities
        .map((a) => SimpleMultiTypeaheadItem.fromJson(a));
    }
    if (jobSearchFilter.keywords) {
      jobSearchFilter.keywords = jobSearchFilter.keywords
        .map((a) => SimpleMultiTypeaheadItem.fromJson(a));
    }
    return jobSearchFilter;
  }

}
