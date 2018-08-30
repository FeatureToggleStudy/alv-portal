import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessage } from './validation-message.model';
import { ValidationService } from '../../validation.service';

/**
 * Component to display validation messages of associated FormControl objects
 * @example <os-validation-messages
 *            [control]="myFormControl"
 *            [customValidationMessages]="[{error: 'require', message: 'Custom message'}]"
 *            [id]="myValidationId"
 */
@Component({
  selector: 'os-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss']
})
export class ValidationMessagesComponent implements OnInit {

  /**
   * FormControl object that should be validated
   */
  @Input() control: FormControl;

  /**
   * Unique ID to associate the validation message with the (HTML) input, textarea or select
   * field using their "aria-describedby" attribute (needed for accessibility).
   */
  @Input() id: string;

  /**
   * (optional) add custom validation messages or override the default ones
   */
  @Input() customValidationMessages?: Array<ValidationMessage>;

  validationMessages: Array<ValidationMessage>;

  constructor(private validationService: ValidationService) { }

  ngOnInit() {
    this.validationMessages = this.validationService.prepareValidationMessages(this.customValidationMessages);
  }

  getErrorMessage(message: ValidationMessage, properties: any): string {
    let resultMessage = message.message;
    for (const property in properties) {
      if (properties.hasOwnProperty(property)) {
        // Check for error specific messages
        if (message[property]) {
          resultMessage = message[property];
        }
      }
    }
    return this.replaceVariables(resultMessage, properties);
  }

  private replaceVariables(message: string, properties: any): string {
    let resultMessage = message;
    for (const property in properties) {
      if (properties.hasOwnProperty(property)) {

        if (typeof properties[property] === 'object') {
          resultMessage = this.replaceVariables(resultMessage, properties[property]);
        } else {
          resultMessage = resultMessage.replace('{{' + property + '}}', properties[property]);
        }
      }
    }
    return resultMessage;
  }
}
