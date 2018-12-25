import { Injectable } from '@angular/core';
import { Base64Service } from '../../core/base64.service';
import { CandidateSearchFilter } from '../state-management';
import { CandidateQueryPanelValues } from '../../widgets/candidate-search-widget/candidate-query-panel/candidate-query-panel-values';
import { OccupationMultiTypeaheadItem } from '../../shared/occupations/occupation-multi-typeahead-item';
import { LocalityMultiTypeaheadItem } from '../../shared/localities/locality-multi-typeahead-item';
import { SimpleMultiTypeaheadItem } from '../../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';

@Injectable()
export class CandidateSearchFilterParameterService {

  constructor(private base64Service: Base64Service) {
  }

  public decodeQueryPanelValues(queryFilterValuesString: string): CandidateQueryPanelValues {
    const queryPanelValues: CandidateQueryPanelValues = JSON.parse(queryFilterValuesString);
    this.initObjects(queryPanelValues);
    return queryPanelValues;
  }

  public encode(filter: CandidateSearchFilter) {
    return encodeURIComponent(this.base64Service.encode(JSON.stringify(filter)));
  }

  public decode(filterAsString: string): CandidateSearchFilter {
    const filter: CandidateSearchFilter = JSON.parse(this.base64Service.decode(decodeURIComponent(filterAsString)));
    this.initObjects(filter);
    return filter;
  }

  private initObjects(jobQueryPanelValues: CandidateQueryPanelValues) {
    if (jobQueryPanelValues.occupations) {
      jobQueryPanelValues.occupations = jobQueryPanelValues.occupations
        .map((a) => OccupationMultiTypeaheadItem.fromJson(a));
    }
    if (jobQueryPanelValues.workplace) {
      jobQueryPanelValues.workplace = LocalityMultiTypeaheadItem.fromJson(jobQueryPanelValues.workplace);
    }
    if (jobQueryPanelValues.keywords) {
      jobQueryPanelValues.keywords = jobQueryPanelValues.keywords
        .map((a) => SimpleMultiTypeaheadItem.fromJson(a));
    }
  }

}
