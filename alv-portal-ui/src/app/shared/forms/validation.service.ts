import { Injectable } from '@angular/core';
import { ValidationMessage } from './input/validation-messages/validation-message.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  defaultValidationMessages: Array<ValidationMessage> = [
    {
      error: 'required',
      message: 'entity.validation.required'
    },
    {
      error: 'min',
      message: 'entity.validation.min'
    },
    {
      error: 'minlength',
      message: 'portal.forms.validation.minlength'
    },
    {
      error: 'max',
      message: 'entity.validation.max'
    },
    {
      error: 'maxlength',
      message: 'portal.forms.validation.maxlength'
    },
    {
      error: 'pattern',
      message: 'portal.forms.validation.pattern'
    },
    {
      error: 'ngbDate',
      message: 'portal.forms.validation.ngbDate.format',
      requiredBefore: 'portal.forms.validation.ngbDate.before',
      requiredAfter: 'portal.forms.validation.ngbDate.after'
    },
    {
      error: 'houseNumValidator',
      message: 'portal.forms.validation.message.houseNr'
    },
    {
      error: 'emailValidator',
      message: 'global.messages.validate.email.invalid'
    },
    {
      error: 'phoneValidator',
      message: 'global.messages.validate.phone.format'
    },
    {
      error: 'urlValidator',
      message: 'portal.forms.validation.url'
    }
  ];

  constructor() {
  }

  prepareValidationMessages(customValidationMessages?: Array<ValidationMessage>): Array<ValidationMessage> {
    if (!customValidationMessages || customValidationMessages.length === 0) {
      return this.defaultValidationMessages;
    } else {
      const customErrors = customValidationMessages.map(custom => custom.error);
      return [...this.defaultValidationMessages.filter(
          validationMessage => !customErrors.includes(validationMessage.error)), ...customValidationMessages];
    }
  }


}
