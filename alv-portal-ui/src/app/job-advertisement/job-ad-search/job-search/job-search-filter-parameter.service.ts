import { Injectable } from '@angular/core';
import { JobSearchFilter, } from '../state-management';
import { Base64Service } from '../../../core/base64.service';
import { OccupationTypeaheadItem } from '../../../shared/occupations/occupation-typeahead-item';
import { StringTypeaheadItem } from '../../../shared/forms/input/typeahead/string-typeahead-item';
import { JobQueryPanelValues } from '../../../widgets/job-search-widget/job-query-panel/job-query-panel-values';
import { LocalityTypeaheadItem } from '../../../shared/localities/locality-typeahead-item';

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
        .map((a) => OccupationTypeaheadItem.fromJson(a));
    }
    if (jobQueryPanelValues.localities) {
      jobQueryPanelValues.localities = jobQueryPanelValues.localities
        .map((a) => LocalityTypeaheadItem.fromJson(a));
    }
    if (jobQueryPanelValues.keywords) {
      jobQueryPanelValues.keywords = jobQueryPanelValues.keywords
        .map((a) => StringTypeaheadItem.fromJson(a));
    }
  }

}
