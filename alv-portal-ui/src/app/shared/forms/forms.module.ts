import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './input/input-field/input-field.component';
import { ValidationMessagesComponent } from './input/validation-messages/validation-messages.component';
import {
  NgbDateNativeAdapter,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbPopoverConfig,
  NgbTooltipModule,
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
import { MultiTypeaheadComponent } from './input/typeahead/multi-typeahead/multi-typeahead.component';
import { SingleTypeaheadComponent } from './input/typeahead/single-typeahead/single-typeahead.component';
import { AutofocusDirective } from './autofocus.directive';
import { IconsModule } from '../icons/icons.module';
import { SliderInputComponent } from './input/slider-input/slider-input.component';
import { NouisliderModule } from 'ng2-nouislider';
import { ZipCityInputComponent } from './input/zip-city-input/zip-city-input.component';
import { DragDropDirective } from './input/file-input/drag-drop.directive';
import { FileInputComponent } from './input/file-input/file-input.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    NgFormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbTooltipModule,
    TranslateModule,
    NouisliderModule,
    PipesModule
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
    SliderInputComponent,
    ZipCityInputComponent,
    DragDropDirective,
    FileInputComponent
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
    SliderInputComponent,
    SingleTypeaheadComponent,
    ReactiveFormsModule,
    NgbTooltipModule,
    ZipCityInputComponent,
    DragDropDirective,
    FileInputComponent
  ],
  providers: [
    NgbPopoverConfig,
    { provide: NgbDateParserFormatter, useClass: DateParserFormatter },
    NgbDateNativeAdapter
  ]

})
export class FormsModule {
}
