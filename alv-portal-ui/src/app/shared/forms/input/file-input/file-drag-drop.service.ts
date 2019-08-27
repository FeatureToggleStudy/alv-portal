import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FileDragDropService {

  constructor(@Inject(DOCUMENT) private document: any) {
    this.disableFileDragDropGlobally();
  }

  disableFileDragDropGlobally() {
    const disabledDragDropArea = this.document.body;
    disabledDragDropArea.addEventListener('dragover', this.preventDefaultForFiles);
    disabledDragDropArea.addEventListener('dragleave', this.preventDefaultForFiles);
    disabledDragDropArea.addEventListener('drop', this.preventDefaultForFiles);
  }

  private preventDefaultForFiles(event: DragEvent) {
    for (let i = 0; i < event.dataTransfer.items.length; i++) {
      if (event.dataTransfer.items[i].kind === 'file') {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
    }
  }
}
