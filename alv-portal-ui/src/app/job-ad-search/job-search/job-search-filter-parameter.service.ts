import { Injectable } from '@angular/core';
import { JobSearchFilter } from '../job-search-filter.types';
import { Base64Service } from '../../core/base64.service';

@Injectable()
export class JobSearchFilterParameterService {

  constructor(private base64Service: Base64Service) {
  }

  public encode(jobSearchFilter: JobSearchFilter) {
    return encodeURIComponent(this.base64Service.encode(JSON.stringify(jobSearchFilter)));
  }

  public decode(jobSearchFilter: string) {
    return JSON.parse(this.base64Service.decode(decodeURIComponent(jobSearchFilter)));
  }

}
