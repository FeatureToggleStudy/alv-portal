import { CommonModule } from '@angular/common';
import { StampComponent } from './components/message/stamp/stamp.component';
import { StampGroupComponent } from './components/message/stamp-group/stamp-group.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbProgressbarModule
} from '@ng-bootstrap/ng-bootstrap';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { FileUploadModule } from 'ng2-file-upload';
import { AddressInputComponent } from './components/address-input/address-input.component';
import { DateIntervalBasicInputComponent } from './components/date-interval-basic-input/date-interval-basic-input.component';
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
import { InputFieldComponent } from './components/input-field/input-field.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../../environments/environment';

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
    YesNoInputComponent,
    DateIntervalInputComponent,
    FilesUploadComponent,
    DocumentUploadComponent,
    DateIntervalBasicInputComponent,
    UploadedFilePresentationComponent,
    HumanizeBytesPipe,
    FileIconComponent,
    DocumentGroupUploadComponent,
    UploadedFileComponent,
    InputFieldComponent,
    ValidationMessagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule.forRoot(),
    NgbProgressbarModule.forRoot(),
    NgbDropdownModule.forRoot(),
    FileUploadModule,
    PrettyJsonModule,
    TranslateModule.forRoot({
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
    YesNoInputComponent,
    DateIntervalInputComponent,
    FilesUploadComponent,
    DocumentUploadComponent,
    UploadedFilePresentationComponent,
    InputFieldComponent,
    ValidationMessagesComponent
  ],
  providers: []
})
export class SharedModule {
}


