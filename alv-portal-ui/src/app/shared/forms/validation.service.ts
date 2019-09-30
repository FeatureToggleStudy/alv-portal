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
      // Attention: requiredBefore and requiredAfter are switched
      // see https://github.com/ng-bootstrap/ng-bootstrap/issues/2922
      requiredBefore: 'portal.forms.validation.ngbDate.after',
      requiredAfter: 'portal.forms.validation.ngbDate.before'
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
    },
    {
      error: 'personNumber',
      message: 'registration.customer.messages.validate.pn'
    },
    {
      error: 'positiveIntegerValidator',
      message: 'portal.forms.validation.message.integerError'
    },
    {
      error: 'fileTooLarge',
      message: 'portal.forms.validation.fileTooLarge'
    },
    {
      error: 'maxFilesCount',
      message: 'portal.forms.validation.maxFilesCount'
    },
    {
      error: 'invalidFileType',
      message: 'portal.forms.validation.invalidFileType'
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
