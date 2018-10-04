import { CommonModule } from '@angular/common';
import { StampComponent } from './components/message/stamp/stamp.component';
import { StampGroupComponent } from './components/message/stamp-group/stamp-group.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbPopoverConfig,
  NgbPopoverModule,
  NgbProgressbarModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { AddressInputComponent } from './components/address-input/address-input.component';
import { DateIntervalInputComponent } from './components/input/date-interval-input/date-interval-input.component';
import { PanelComponent } from './components/panel/panel.component';
import { PanelGroupComponent } from './components/panel-group/panel-group.component';
import { NotificationComponent } from './components/message/notification/notification.component';
import { SelectComponent } from './components/input/select/select.component';
import { InputFieldComponent } from './components/input/input-field/input-field.component';
import { ValidationMessagesComponent } from './components/input/validation-messages/validation-messages.component';
import { DateInputComponent } from './components/input/date-input/date-input.component';
import { DateParserFormatter } from './components/input/date-input/date-parser-formatter';
import { TranslateModule } from '@ngx-translate/core';
import { HelpButtonComponent } from './components/help-button/help-button.component';
import { RadioButtonComponent } from './components/input/radio-button/radio-button.component';
import { CheckboxComponent } from './components/input/checkbox/checkbox.component';

@NgModule({
  declarations: [
    NotificationComponent,
    PanelComponent,
    PanelGroupComponent,
    StampComponent,
    StampGroupComponent,
    AddressInputComponent,
    DateIntervalInputComponent,
    HelpButtonComponent,
    SelectComponent,
    InputFieldComponent,
    ValidationMessagesComponent,
    DateInputComponent,
    RadioButtonComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbProgressbarModule,
    NgbDropdownModule,
    NgbPopoverModule,
    NgbModalModule,
    NgbDropdownModule,
    NgbTooltipModule,
    PrettyJsonModule,
  ],
  entryComponents: [],
  exports: [
    TranslateModule,
    NotificationComponent,
    PanelComponent,
    PanelGroupComponent,
    StampComponent,
    StampGroupComponent,
    NotificationComponent,
    AddressInputComponent,
    DateIntervalInputComponent,
    HelpButtonComponent,
    SelectComponent,
    InputFieldComponent,
    ValidationMessagesComponent,
    DateInputComponent,
    RadioButtonComponent,
    CheckboxComponent,
    NgbDropdownModule,
    NgbModalModule
  ],
  providers: [
    NgbPopoverConfig,
    { provide: NgbDateParserFormatter, useClass: DateParserFormatter }
  ]
})
export class SharedModule {
}


