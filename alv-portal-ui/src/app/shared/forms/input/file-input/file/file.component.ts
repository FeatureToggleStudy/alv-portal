import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FileSaverService } from '../../../../file-saver/file-saver.service';
import { FileMetadata } from './file.types';

@Component({
  selector: 'alv-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() fileName: string;

  @Input() fileSize: number;

  @Input() fileType: string;

  @Input() isDisabled?: boolean;

  @Input() showRemoveButton?: boolean;

  @Input() downloadFile$?: Observable<Blob>;

  @Output() removeFile = new EventEmitter<FileMetadata>();

  private iconMappings = {
    'application/pdf': ['far', 'file-pdf'],
    'image/png': ['far', 'file-image'],
    'image/jpeg': ['far', 'file-image']
  };

  constructor(private fileSaverService: FileSaverService) { }

  ngOnInit() {

  }

  getFileIcon(fileType: string): string[] {
    const fileIcon = this.iconMappings[fileType];
    if (fileIcon) {
      return fileIcon;
    }
    return ['far', 'file'];
  }

  downloadFile() {
    this.downloadFile$.subscribe(blob => {
      this.fileSaverService.saveFile(blob, this.fileName);
    });
  }

  remove() {
    this.removeFile.emit({
      name: this.fileName,
      size: this.fileSize,
      type: this.fileType
    });
  }
}
