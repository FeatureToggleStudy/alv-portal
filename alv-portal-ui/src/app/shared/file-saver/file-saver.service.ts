import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '../../core/window.service';

@Injectable({
  providedIn: 'root'
})
export class FileSaverService {

  constructor(@Inject(DOCUMENT) private document: any,
              @Inject(WINDOW) private window: Window) { }

  saveFile(blob: Blob, filename: string) {
    // Handle Edge and IE11 separately (as usual)
    if (this.window.navigator && this.window.navigator.msSaveOrOpenBlob) {
      this.window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const element = this.document.createElement('a');
      element.href = URL.createObjectURL(blob);
      element.download = filename;
      this.document.body.appendChild(element);
      element.click();
      // URL.revokeObjectURL has to be delayed to make it work on iOS Safari
      setTimeout(() => URL.revokeObjectURL(element.href), 4E4); // 40s
      element.parentElement.removeChild(element);
    }
  }
}
