import { Injectable } from '@angular/core';
import { JobSearchFilter, } from '../state-management/state/job-search-filter.types';
import { Base64Service } from '../../core/base64.service';
import { OccupationMultiTypeaheadItem } from '../../shared/occupations/occupation-multi-typeahead-item';
import { SimpleMultiTypeaheadItem } from '../../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';
import { JobQueryPanelValues } from '../../widgets/job-search-widget/job-query-panel/job-query-panel-values';
import { LocalityMultiTypeaheadItem } from '../../shared/localities/locality-multi-typeahead-item';

@Injectable()
export class JobSearchFilterParameterService {

  constructor(private base64Service: Base64Service) {
  }

  public decodeQueryPanelValues(queryFilterValuesString: string): JobQueryPanelValues {
    const jobQueryPanelValues: JobQueryPanelValues = JSON.parse(queryFilterValuesString);
    this.initObjects(jobQueryPanelValues);
    return jobQueryPanelValues;
  }

  public encode(jobSearchFilter: JobSearchFilter) {
    return encodeURIComponent(this.base64Service.encode(JSON.stringify(jobSearchFilter)));
  }

  public decode(jobSearchFilterString: string): JobSearchFilter {
    const jobSearchFilter: JobSearchFilter = JSON.parse(this.base64Service.decode(decodeURIComponent(jobSearchFilterString)));
    this.initObjects(jobSearchFilter);
    return jobSearchFilter;
  }

  private initObjects(jobQueryPanelValues: JobQueryPanelValues) {
    if (jobQueryPanelValues.occupations) {
      jobQueryPanelValues.occupations = jobQueryPanelValues.occupations
        .map((a) => OccupationMultiTypeaheadItem.fromJson(a));
    }
    if (jobQueryPanelValues.localities) {
      jobQueryPanelValues.localities = jobQueryPanelValues.localities
        .map((a) => LocalityMultiTypeaheadItem.fromJson(a));
    }
    if (jobQueryPanelValues.keywords) {
      jobQueryPanelValues.keywords = jobQueryPanelValues.keywords
        .map((a) => SimpleMultiTypeaheadItem.fromJson(a));
    }
  }

}
