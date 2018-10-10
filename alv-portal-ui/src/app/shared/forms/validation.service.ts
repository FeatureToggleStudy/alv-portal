import { Injectable } from '@angular/core';
import { ValidationMessage } from './input/validation-messages/validation-message.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  defaultValidationMessages: Array<ValidationMessage> = [
    {
      error: 'required',
      message: 'Value is required'
    },
    {
      error: 'min',
      message: 'Min. value is {{min}}'
    },
    {
      error: 'minlength',
      message: 'Min. length is {{requiredLength}}'
    },
    {
      error: 'max',
      message: 'Max. value is {{max}}'
    },
    {
      error: 'maxlength',
      message: 'Max. length is {{requiredLength}}'
    },
    {
      error: 'pattern',
      message: 'Please enter the format {{requiredPattern}}'
    },
    {
      error: 'ngbDate',
      message: 'Invalid date format',
      requiredBefore: 'Date must be after {{day}}.{{month}}.{{year}}',
      requiredAfter: 'Date must be before {{day}}.{{month}}.{{year}}'
    }
  ];

  constructor() {
  }

  prepareValidationMessages(customValidationMessages?: Array<ValidationMessage>): Array<ValidationMessage> {
    if (!customValidationMessages || customValidationMessages.length === 0) {
      return this.defaultValidationMessages;
    } else {
      return this.defaultValidationMessages.map(
          validationMessage => customValidationMessages.find(
              customValidationMessage => customValidationMessage.error === validationMessage.error)
              || validationMessage);
    }
  }


}
