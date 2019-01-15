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
      error: 'defaultPatternValidator',
      message: 'portal.general.form.validation.message.default'
    },
    {
      error: 'houseNumValidator',
      message: 'portal.general.form.validation.message.houseNumber'
    },
    {
      error: 'emailValidator',
      message: 'home.tools.job-publication.messages.validate.email-format'
    },
    {
      error: 'phoneValidator',
      message: 'global.messages.validate.phone.format'
    }
  ];

  constructor() {
  }

  prepareValidationMessages(customValidationMessages?: Array<ValidationMessage>): Array<ValidationMessage> {
    if (!customValidationMessages || customValidationMessages.length === 0) {
      return this.defaultValidationMessages;
    } else {
      return [...this.defaultValidationMessages.map(
        validationMessage => customValidationMessages.find(
          customValidationMessage => customValidationMessage.error === validationMessage.error)
          || validationMessage), ...customValidationMessages];
    }
  }


}
