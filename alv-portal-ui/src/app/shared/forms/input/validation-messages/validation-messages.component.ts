import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessage } from './validation-message.model';
import { ValidationService } from '../../validation.service';

/**
 * Component to display validation messages of associated FormControl objects
 * @example <alv-validation-messages
 *            [control]="myFormControl"
 *            [customValidationMessages]="[{error: 'require', message: 'Custom message'}]"
 *            [id]="myValidationId"
 */
@Component({
  selector: 'alv-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss']
})
export class ValidationMessagesComponent implements OnInit {

  @HostBinding('attr.role') readonly role = 'alert';

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

  constructor(private validationService: ValidationService) {
  }

  ngOnInit() {
    this.validationMessages = this.validationService.prepareValidationMessages(this.customValidationMessages);
  }

  getErrorMessage(message: ValidationMessage, properties: any): string {
    let resultMessage = message.message;
    for (const property in properties) {
      if (properties.hasOwnProperty(property)) {
        // Check for error specific messages
        if (message[property]) {
          return resultMessage = message[property];
        }
      }
    }
    return resultMessage;
  }

}
