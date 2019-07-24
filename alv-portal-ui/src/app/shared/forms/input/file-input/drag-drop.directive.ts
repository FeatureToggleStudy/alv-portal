import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener, Input,
  Output
} from '@angular/core';

@Directive({
  selector: '[alvDragDrop]'
})
export class DragDropDirective {

  constructor() { }

  @Output() fileDropped = new EventEmitter<File[]>();

  @Input() dragDropDisabled: boolean;

  @HostBinding('class.alv-dragover') private dragover: boolean;

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!this.dragDropDisabled) {
      this.dragover = true;
    }

  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!this.dragDropDisabled) {
      this.dragover = false;
    }
  }

  @HostListener('drop', ['$event']) ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!this.dragDropDisabled) {
      this.dragover = false;
      const files = evt.dataTransfer.files;
      if (files.length > 0) {
        this.fileDropped.emit(files);
      }
    }
  }
}
