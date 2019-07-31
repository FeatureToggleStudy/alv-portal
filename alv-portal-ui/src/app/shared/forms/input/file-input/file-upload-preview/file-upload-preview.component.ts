import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FileSaverService } from '../../../../file-saver/file-saver.service';
import { FileMetadata } from './file-upload-preview.types';

@Component({
  selector: 'alv-file-upload-preview',
  templateUrl: './file-upload-preview.component.html',
  styleUrls: ['./file-upload-preview.component.scss']
})
export class FileUploadPreviewComponent {

  @Input() fileName: string;

  @Input() fileSize: number;

  @Input() fileType: string;

  @Input() isDisabled?: boolean;

  @Input() showRemoveButton?: boolean;

  @Input() downloadFile$?: Observable<Blob>;

  @Output() removeFile = new EventEmitter<FileMetadata>();

  constructor() { }

  remove() {
    this.removeFile.emit({
      name: this.fileName,
      size: this.fileSize,
      type: this.fileType
    });
  }
}
