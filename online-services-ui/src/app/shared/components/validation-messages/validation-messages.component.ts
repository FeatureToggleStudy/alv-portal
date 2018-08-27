import {
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessage } from './validation-message.model';
import { ValidationService } from '../../validation.service';

@Component({
  selector: 'os-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss']
})
export class ValidationMessagesComponent implements OnInit {

  @HostBinding('class') readonly class = 'invalid-';

  @Input() control: FormControl;
  @Input() customValidationMessages?: Array<ValidationMessage>;
  @Input() id: string;

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
