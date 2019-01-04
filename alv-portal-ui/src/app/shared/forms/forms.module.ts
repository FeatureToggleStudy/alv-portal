import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './input/input-field/input-field.component';
import { ValidationMessagesComponent } from './input/validation-messages/validation-messages.component';
import {
  NgbDateNativeAdapter,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbPopoverConfig,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { DateParserFormatter } from './input/date-input/date-parser-formatter';
import { FormsModule as NgFormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './input/checkbox/checkbox.component';
import { RadioButtonComponent } from './input/radio-button/radio-button.component';
import { DateInputComponent } from './input/date-input/date-input.component';
import { SelectComponent } from './input/select/select.component';
import { DateIntervalInputComponent } from './input/date-interval-input/date-interval-input.component';
import { FormSubmitValidationDirective } from './form-submit-validation.directive';
import { TranslateModule } from '@ngx-translate/core';
import { MultiTypeaheadComponent } from './input/multi-typeahead/multi-typeahead.component';
import { SingleTypeaheadComponent } from './input/single-typeahead/single-typeahead.component';
import { AutofocusDirective } from './autofocus.directive';
import { PhoneInputComponent } from './input/phone-input/phone-input.component';

@NgModule({
  imports: [
    CommonModule,
    NgFormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    TranslateModule
  ],
  declarations: [
    DateIntervalInputComponent,
    SelectComponent,
    InputFieldComponent,
    ValidationMessagesComponent,
    DateInputComponent,
    RadioButtonComponent,
    CheckboxComponent,
    FormSubmitValidationDirective,
    MultiTypeaheadComponent,
    SingleTypeaheadComponent,
    AutofocusDirective,
    PhoneInputComponent
  ],
  exports: [
    DateIntervalInputComponent,
    SelectComponent,
    InputFieldComponent,
    ValidationMessagesComponent,
    DateInputComponent,
    RadioButtonComponent,
    CheckboxComponent,
    FormSubmitValidationDirective,
    MultiTypeaheadComponent,
    SingleTypeaheadComponent,
    ReactiveFormsModule,
    PhoneInputComponent
  ],
  providers: [
    NgbPopoverConfig,
    { provide: NgbDateParserFormatter, useClass: DateParserFormatter },
    NgbDateNativeAdapter
  ]

})
export class FormsModule {
}
