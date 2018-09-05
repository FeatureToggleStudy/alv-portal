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
  NgbProgressbarModule, NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { FileUploadModule } from 'ng2-file-upload';
import { AddressInputComponent } from './components/address-input/address-input.component';
import { DateIntervalInputComponent } from './components/date-interval-input/date-interval-input.component';
import { DocumentUploadComponent } from './components/upload/document-upload/document-upload.component';
import { FileIconComponent } from './components/upload/files-upload/file-icon/file-icon.component';
import { FilesUploadComponent } from './components/upload/files-upload/files-upload.component';
import { HumanizeBytesPipe } from './components/upload/files-upload/humanize-bytes.pipe';
import { UploadedFilePresentationComponent } from './components/upload/files-upload/uploaded-file/uploaded-file-presentation.component';
import { PanelComponent } from './components/panel/panel.component';
import { PanelGroupComponent } from './components/panel-group/panel-group.component';
import { YesNoInputComponent } from './components/yes-no-input/yes-no-input.component';
import { DocumentGroupUploadComponent } from './components/upload/document-group-upload/document-group-upload.component';
import { UploadedFileComponent } from './components/upload/files-upload/uploaded-file/uploaded-file/uploaded-file.component';
import { NotificationComponent } from './components/message/notification/notification.component';
import { SelectComponent } from './components/select/select.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { DateParserFormatter } from './components/date-input/date-parser-formatter';
import { HelpButtonComponent } from './components/help-button/help-button.component';

@NgModule({
  declarations: [
    NotificationComponent,
    PanelComponent,
    PanelGroupComponent,
    StampComponent,
    StampGroupComponent,
    AddressInputComponent,
    YesNoInputComponent,
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
    DateInputComponent
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
    PrettyJsonModule

  ],
  entryComponents: [],
  exports: [
    NotificationComponent,
    PanelComponent,
    PanelGroupComponent,
    StampComponent,
    StampGroupComponent,
    NotificationComponent,
    AddressInputComponent,
    YesNoInputComponent,
    DateIntervalInputComponent,
    FilesUploadComponent,
    DocumentUploadComponent,
    UploadedFilePresentationComponent,
    HelpButtonComponent,
    SelectComponent,
    InputFieldComponent,
    ValidationMessagesComponent,
    DateInputComponent
  ],
  providers: [
    NgbPopoverConfig,
    {provide: NgbDateParserFormatter, useClass: DateParserFormatter}
  ]
})
export class SharedModule {
}


