import { inject, TestBed } from '@angular/core/testing';

import { InputService } from './input.service';
import { InputType } from './input-type.enum';

describe('InputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputService]
    });
  });

  it('should create different ids', inject([InputService], (service: InputService) => {
    expect(service.getNextInputId(InputType.INPUT_FIELD, 'First Label')).toEqual('alv-input-field-first-label-0');
    expect(service.getNextInputId(InputType.INPUT_FIELD, 'Second Label')).toEqual('alv-input-field-second-label-0');
    expect(service.getNextInputId(InputType.SELECT, 'First Label')).toEqual('alv-select-first-label-0');
    expect(service.getNextInputId(InputType.SELECT, 'Second Label')).toEqual('alv-select-second-label-0');
  }));

  it('should create consecutive ids', inject([InputService], (service: InputService) => {
    expect(service.getNextInputId(InputType.CHECKBOX, 'Same Label')).toEqual('alv-checkbox-same-label-0');
    expect(service.getNextInputId(InputType.RADIO_BUTTON, 'Same Label')).toEqual('alv-radio-button-same-label-0');
    expect(service.getNextInputId(InputType.RADIO_BUTTON, 'Same Label')).toEqual('alv-radio-button-same-label-1');
    expect(service.getNextInputId(InputType.CHECKBOX, 'Same Label')).toEqual('alv-checkbox-same-label-1');
  }));

});
