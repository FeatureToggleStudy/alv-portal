import { Injectable } from '@angular/core';
import { Base64Service } from '../../core/base64.service';
import { CandidateSearchFilter } from '../state-management';

@Injectable()
export class CandidateSearchFilterParameterService {

  constructor(private base64Service: Base64Service) {
  }

  // public decodeQueryPanelValues(queryFilterValuesString: string): JobQueryPanelValues {
  //   const jobQueryPanelValues: JobQueryPanelValues = JSON.parse(queryFilterValuesString);
  //   this.initObjects(jobQueryPanelValues);
  //   return jobQueryPanelValues;
  // }

  public encode(candidateSearchFilter: CandidateSearchFilter) {
    return encodeURIComponent(this.base64Service.encode(JSON.stringify(candidateSearchFilter)));
  }

  public decode(jobSearchFilterString: string): CandidateSearchFilter {
    const jobSearchFilter: CandidateSearchFilter = JSON.parse(this.base64Service.decode(decodeURIComponent(jobSearchFilterString)));
    //this.initObjects(jobSearchFilter);
    return jobSearchFilter;
  }

  // private initObjects(jobQueryPanelValues: JobQueryPanelValues) {
  //   if (jobQueryPanelValues.occupations) {
  //     jobQueryPanelValues.occupations = jobQueryPanelValues.occupations
  //       .map((a) => OccupationMultiTypeaheadItem.fromJson(a));
  //   }
  //   if (jobQueryPanelValues.localities) {
  //     jobQueryPanelValues.localities = jobQueryPanelValues.localities
  //       .map((a) => SimpleMultiTypeaheadItem.fromJson(a));
  //   }
  //   if (jobQueryPanelValues.keywords) {
  //     jobQueryPanelValues.keywords = jobQueryPanelValues.keywords
  //       .map((a) => SimpleMultiTypeaheadItem.fromJson(a));
  //   }
  // }

}
