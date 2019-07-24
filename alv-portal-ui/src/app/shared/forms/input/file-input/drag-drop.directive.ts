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
    if (!this.dragDropDisabled) {
      evt.preventDefault();
      evt.stopPropagation();
      this.dragover = true;
    }
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    if (!this.dragDropDisabled) {
      evt.preventDefault();
      evt.stopPropagation();
      this.dragover = false;
    }
  }

  @HostListener('drop', ['$event']) ondrop(evt) {
    if (!this.dragDropDisabled) {
      evt.preventDefault();
      evt.stopPropagation();
      this.dragover = false;
      const files = evt.dataTransfer.files;
      if (files.length > 0) {
        this.fileDropped.emit(files);
      }
    }
  }
}
