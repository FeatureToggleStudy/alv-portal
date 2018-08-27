import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessage } from './components/validation-messages/validation-message.model';

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
    }
  ];

  constructor() { }

  getValidator(validator: string, formControl: FormControl): any {
    console.log(JSON.stringify(formControl.validator(new FormControl())));
    return formControl.validator(new FormControl(''))[validator];
    // returns true if control has the validator
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

  isRequired(formControl: FormControl): boolean {
    if (!formControl || !formControl.validator) {
      return false;
    }
    const validators = formControl.validator(new FormControl(''));

    return validators && validators['required'];
  }
}
