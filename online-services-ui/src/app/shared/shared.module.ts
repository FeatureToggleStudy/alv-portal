import { CommonModule } from '@angular/common';
import { StampComponent } from './components/message/stamp/stamp.component';
import { StampGroupComponent } from './components/message/stamp-group/stamp-group.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbPopoverConfig,
  NgbPopoverModule,
  NgbProgressbarModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { FileUploadModule } from 'ng2-file-upload';
import { AddressInputComponent } from './components/address-input/address-input.component';
import { DateIntervalInputComponent } from './components/input/date-interval-input/date-interval-input.component';
import { DocumentUploadComponent } from './components/upload/document-upload/document-upload.component';
import { FileIconComponent } from './components/upload/files-upload/file-icon/file-icon.component';
import { FilesUploadComponent } from './components/upload/files-upload/files-upload.component';
import { HumanizeBytesPipe } from './components/upload/files-upload/humanize-bytes.pipe';
import { UploadedFilePresentationComponent } from './components/upload/files-upload/uploaded-file/uploaded-file-presentation.component';
import { PanelComponent } from './components/panel/panel.component';
import { PanelGroupComponent } from './components/panel-group/panel-group.component';
import { DocumentGroupUploadComponent } from './components/upload/document-group-upload/document-group-upload.component';
import { UploadedFileComponent } from './components/upload/files-upload/uploaded-file/uploaded-file/uploaded-file.component';
import { NotificationComponent } from './components/message/notification/notification.component';
import { SelectComponent } from './components/input/select/select.component';
import { InputFieldComponent } from './components/input/input-field/input-field.component';
import { ValidationMessagesComponent } from './components/input/validation-messages/validation-messages.component';
import { DateInputComponent } from './components/input/date-input/date-input.component';
import { DateParserFormatter } from './components/input/date-input/date-parser-formatter';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../../environments/environment';
import { HelpButtonComponent } from './components/help-button/help-button.component';
import { RadioButtonComponent } from './components/input/radio-button/radio-button.component';
import { CheckboxComponent } from './components/input/checkbox/checkbox.component';


/**
 * Setting up the ngx-translate
 * @param http
 */
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, environment.translationBaseUrl, '.json');
}

@NgModule({
  declarations: [
    NotificationComponent,
    PanelComponent,
    PanelGroupComponent,
    StampComponent,
    StampGroupComponent,
    AddressInputComponent,
    DateIntervalInputComponent,
    FilesUploadComponent,
    DocumentUploadComponent,
    UploadedFilePresentationComponent,
    HumanizeBytesPipe,
    FileIconComponent,
    DocumentGroupUploadComponent,
    UploadedFileComponent,
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
    NgbTooltipModule,
    FileUploadModule,
    PrettyJsonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })

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
    FilesUploadComponent,
    DocumentUploadComponent,
    UploadedFilePresentationComponent,
    HelpButtonComponent,
    SelectComponent,
    InputFieldComponent,
    ValidationMessagesComponent,
    DateInputComponent,
    RadioButtonComponent,
    CheckboxComponent
  ],
  providers: [
    NgbPopoverConfig,
    {provide: NgbDateParserFormatter, useClass: DateParserFormatter}
  ]
})
export class SharedModule {
}


