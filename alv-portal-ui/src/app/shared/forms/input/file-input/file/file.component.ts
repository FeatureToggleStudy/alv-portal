import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FileSaverService } from '../../../../file-saver/file-saver.service';

@Component({
  selector: 'alv-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent {

  @Input() fileName: string;

  @Input() fileType: string;

  @Input() iconSize?: string;

  @Input() downloadFile$?: Observable<Blob>;

  private iconMappings = {
    'application/pdf': ['far', 'file-pdf'],
    'image/png': ['far', 'file-image'],
    'image/jpeg': ['far', 'file-image']
  };

  constructor(private fileSaverService: FileSaverService) { }

  downloadFile() {
    this.downloadFile$.subscribe(blob => {
      this.fileSaverService.saveFile(blob, this.fileName);
    });
  }

  getFileIcon(fileType: string): string[] {
    const fileIcon = this.iconMappings[fileType];
    if (fileIcon) {
      return fileIcon;
    }
    return ['far', 'file'];
  }

  isLargeIconSize(): boolean {
    return this.iconSize === 'lg';
  }
}
