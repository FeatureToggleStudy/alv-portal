import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FileDragDropService {

  constructor(@Inject(DOCUMENT) private document: any) {
  }

  disableFileDragDropGlobally() {
    const disabledDragDropArea = this.document.body;
    disabledDragDropArea.addEventListener('dragover', this.preventDefaultForFiles.bind(this));
    disabledDragDropArea.addEventListener('dragleave', this.preventDefaultForFiles.bind(this));
    disabledDragDropArea.addEventListener('drop', this.preventDefaultForFiles.bind(this));
  }

  private preventDefaultForFiles(event: DragEvent) {
    if (this.isFileDragDropEvent(event.dataTransfer.types)) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
  }

  private isFileDragDropEvent(types: any): boolean {
    // Chrome & Firefox
    if (types.includes) {
      return types.includes('Files');
    }
    // IE11, Edge & Safari
    if (types.contains) {
      return types.contains('Files');
    }
    return false;
  }
}

