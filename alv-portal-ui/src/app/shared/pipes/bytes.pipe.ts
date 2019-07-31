import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../backend-services/job-advertisement/job-advertisement.types';

@Pipe({
  name: 'bytes'
})
export class BytesPipe implements PipeTransform {

  constructor() {
  }

  transform(bytes: number): any {

    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < Math.pow(1024, 2)) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }
    if (bytes < Math.pow(1024, 3)) {
      return `${(bytes / Math.pow(1024, 2)).toFixed(0)} MB`;
    }
    return `${(bytes / Math.pow(1024, 3)).toFixed(0)} GB`;
  }
}
