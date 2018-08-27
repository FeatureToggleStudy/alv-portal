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

  replaceVariables(message: string, properties: any): string {
    let resultMessage = message;
    for (const property in properties) {
      if (properties.hasOwnProperty(property)) {
        resultMessage = resultMessage.replace('{{' + property + '}}', properties[property]);
      }
    }
    return resultMessage;
  }
}
