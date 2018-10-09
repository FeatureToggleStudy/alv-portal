import { Injectable } from '@angular/core';
import { InputType } from './input-type.enum';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  private inputIds: any = {};

  constructor() { }

  getNextInputId(inputType: InputType, label: string): string {
    const labelKey = label ? label.replace(/ /g, '-').toLowerCase() : '';
    if (!this.inputIds[inputType + labelKey]) {
      this.inputIds[inputType + labelKey] = 0;
    }
    return `alv-${inputType}-${labelKey}-${this.inputIds[inputType + labelKey]++}`;
  }

}
