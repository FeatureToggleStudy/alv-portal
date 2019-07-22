import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationsService } from '../../../core/notifications.service';
import { BytesPipe } from '../../pipes/bytes.pipe';

@Component({
  selector: 'alv-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() accept = '.pdf';

  @Input() maxFilesCount = 1;

  @Input() maxFileSize: number;

  @Input() showDeleteFile = true;

  @Output() filesChanged = new EventEmitter<File[]>();

  files: File[] = [];

  private iconMappings = {
    'application/pdf': ['far', 'file-pdf'],
    'image/png': ['far', 'file-image'],
    'image/jpeg': ['far', 'file-image']
  };

  constructor(private notificationsService: NotificationsService,
              private bytesPipe: BytesPipe) {
  }

  ngOnInit() {
  }

  uploadFile(files: File[]) {
    if (!this.showDeleteFile) {
      this.files = [];
    }

    let fileAdded = false;
    for (let i = 0; i < files.length; i++) {
      if (this.maxFileSize && files[i].size > this.maxFileSize) {
        this.notificationsService.error('Eine Datei darf maximal ' + this.bytesPipe.transform(this.maxFileSize) + ' gross sein.');
        continue;
      }
      if (this.files.length === this.maxFilesCount) {
        this.notificationsService.error('You can upload max. ' + this.maxFilesCount + ' Files.');
        break;
      }
      this.files.push(files[i]);
      fileAdded = true;
    }
    if (fileAdded) {
      this.filesChanged.emit(this.files);
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
    this.filesChanged.emit(this.files);
  }

  getFileIcon(fileType: string): string[] {
    const fileIcon = this.iconMappings[fileType];
    if (fileIcon) {
      return fileIcon;
    }
    return ['far', 'file'];
  }

  isFileUploadDisabled(): boolean {
    return this.showDeleteFile && this.files.length >= this.maxFilesCount;
  }
}
