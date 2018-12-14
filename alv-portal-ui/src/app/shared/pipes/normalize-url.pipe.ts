import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalizeUrl'
})
export class NormalizeUrlPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      return `http://${value}`;
    }
    return value;
  }
}
