import { Pipe, PipeTransform } from '@angular/core';
import * as prettyBytes from 'pretty-bytes';

/**
 * formats byte sizes to KB, MB etc
 *
 * Depends on pretty-bytes library
 */
@Pipe({
  name: 'humanizeBytes'
})
export class HumanizeBytesPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    return prettyBytes(value);
  }

}
