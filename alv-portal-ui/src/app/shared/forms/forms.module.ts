import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './input/input-field/input-field.component';
import { ValidationMessagesComponent } from './input/validation-messages/validation-messages.component';
import {
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbPopoverConfig
} from '@ng-bootstrap/ng-bootstrap';
import { DateParserFormatter } from './input/date-input/date-parser-formatter';
import { FormsModule as NgFormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './input/checkbox/checkbox.component';
import { RadioButtonComponent } from './input/radio-button/radio-button.component';
import { DateInputComponent } from './input/date-input/date-input.component';
import { SelectComponent } from './input/select/select.component';
import { DateIntervalInputComponent } from './input/date-interval-input/date-interval-input.component';
import { AddressInputComponent } from './address-input/address-input.component';

@NgModule({
  imports: [
    CommonModule,
    NgFormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
  declarations: [
    AddressInputComponent,
    DateIntervalInputComponent,
    SelectComponent,
    InputFieldComponent,
    ValidationMessagesComponent,
    DateInputComponent,
    RadioButtonComponent,
    CheckboxComponent
  ],
  exports: [
    AddressInputComponent,
    DateIntervalInputComponent,
    SelectComponent,
    InputFieldComponent,
    ValidationMessagesComponent,
    DateInputComponent,
    RadioButtonComponent,
    CheckboxComponent
  ],
  providers: [
    NgbPopoverConfig,
    { provide: NgbDateParserFormatter, useClass: DateParserFormatter }
  ]

})
export class FormsModule {
}
