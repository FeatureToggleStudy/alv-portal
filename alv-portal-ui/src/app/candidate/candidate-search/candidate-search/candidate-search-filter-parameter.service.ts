import { Injectable } from '@angular/core';
import { Base64Service } from '../../../core/base64.service';
import { CandidateSearchFilter } from '../state-management';
import { CandidateQueryPanelValues } from '../../../widgets/candidate-search-widget/candidate-query-panel/candidate-query-panel-values';
import { OccupationTypeaheadItem } from '../../../shared/occupations/occupation-typeahead-item';
import { LocalityTypeaheadItem } from '../../../shared/localities/locality-typeahead-item';
import { StringTypeaheadItem } from '../../../shared/forms/input/typeahead/string-typeahead-item';

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

  public decodeSearchFilter(filterAsString: string): CandidateSearchFilter {
    const filter: CandidateSearchFilter = JSON.parse(this.base64Service.decode(decodeURIComponent(filterAsString)));
    this.initObjects(filter);
    return filter;
  }

  private initObjects(candidateQueryPanelValues: CandidateQueryPanelValues) {
    if (candidateQueryPanelValues.occupations) {
      candidateQueryPanelValues.occupations = candidateQueryPanelValues.occupations
        .map((a) => OccupationTypeaheadItem.fromJson(a));
    }
    if (candidateQueryPanelValues.workplace) {
      candidateQueryPanelValues.workplace = LocalityTypeaheadItem.fromJson(candidateQueryPanelValues.workplace);
    }
    if (candidateQueryPanelValues.keywords) {
      candidateQueryPanelValues.keywords = candidateQueryPanelValues.keywords
        .map((a) => StringTypeaheadItem.fromJson(a));
    }
  }

}
