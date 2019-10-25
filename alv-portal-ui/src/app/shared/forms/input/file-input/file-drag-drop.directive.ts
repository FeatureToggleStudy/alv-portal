import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[alvFileDragDrop]'
})
export class FileDragDropDirective implements OnInit, OnDestroy {

  @Output() fileDropped = new EventEmitter<File[]>();

  @Input() dragDropDisabled: boolean;

  @Input() parentDragDropAreaId?: string;

  @HostBinding('class.alv-dragover') private dragover: boolean;

  private onDragOverFn = this.onDragOver.bind(this);

  private onDragLeaveFn = this.onDragLeave.bind(this);

  private onDropFn = this.onDrop.bind(this);

  private dragDropArea: Element;

  constructor(@Inject(DOCUMENT) private document: any,
              private element: ElementRef) {
  }

  ngOnInit() {
    this.setupDragDropArea();
  }

  ngOnDestroy() {
    this.teardownDragDropArea();
  }

  onDragOver(evt) {
    if (!this.dragDropDisabled) {
      evt.preventDefault();
      evt.stopPropagation();
      this.dragover = true;
    }
  }

  onDragLeave(evt) {
    if (!this.dragDropDisabled) {
      evt.preventDefault();
      evt.stopPropagation();
      this.dragover = false;
    }
  }

  onDrop(evt) {
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

  private setupDragDropArea() {
    this.dragDropArea = this.document.querySelector('#' + this.parentDragDropAreaId) || this.element.nativeElement;
    if (this.dragDropArea) {
      this.dragDropArea.addEventListener('dragover', this.onDragOverFn);
      this.dragDropArea.addEventListener('dragleave', this.onDragLeaveFn);
      this.dragDropArea.addEventListener('drop', this.onDropFn);
    }
  }

  private teardownDragDropArea() {
    if (this.dragDropArea) {
      this.dragDropArea.removeEventListener('dragover', this.onDragOverFn);
      this.dragDropArea.removeEventListener('dragleave', this.onDragLeaveFn);
      this.dragDropArea.removeEventListener('drop', this.onDropFn);
    }
  }

}
