import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../backend-services/job-advertisement/job-advertisement.types';

@Pipe({
  name: 'jobLocation'
})
export class JobLocationPipe implements PipeTransform {

  constructor() {
  }

  transform(location: Location, args?: any): any {
    let result = '';
    if (!location) {
      return result;
    }
    if (location.postalCode) {
      result += location.postalCode;
    }
    if (location.city) {
      result += ` ${location.city}`;
    }
    if (location.cantonCode || location.countryIsoCode) {
      result += ` (${location.cantonCode || location.countryIsoCode})`;
    }
    return result;
  }
}
