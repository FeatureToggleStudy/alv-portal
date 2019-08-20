import { Component, Host, Input, Optional, SkipSelf } from '@angular/core';
import { BytesPipe } from '../../../pipes/bytes.pipe';
import { AbstractInput } from '../abstract-input';
import { ControlContainer } from '@angular/forms';
import { InputIdGenerationService } from '../input-id-generation.service';
import { InputType } from '../input-type.enum';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'alv-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent extends AbstractInput {

  private readonly ALL_FILE_TYPES = '*/*';

  /**
   * Label for the upload area
   */
  @Input() uploadAreaLabel: string;

  /**
   * Limit the allowed number of files (default: 1)
   */
  @Input() maxFilesCount = 1;

  /**
   * (optional) Limit the allowed file extensions/media types
   * @link https://www.w3schools.com/tags/att_input_accept.asp
   */
  @Input() accept = this.ALL_FILE_TYPES;

  /**
   * (optional) Limit the allowed size of files
   */
  @Input() maxFileSize?: number;

  /**
   * If set to false, the remove button will be hidden and selected files will be overridden
   */
  @Input() showRemoveButton = true;

  files: File[] = [];

  constructor(private bytesPipe: BytesPipe,
              @Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.FILE_INPUT, inputIdGenerationService);
  }

  uploadFile(files: File[]) {
    this.control.markAsTouched();

    if (!this.showRemoveButton) {
      this.files = []; // reset because there is no delete button
    }

    let fileTooLarge = false;
    let maxFilesCount = false;
    let invalidFileType = false;
    for (let i = 0; i < files.length; i++) {
      if (this.isMaxFilesCountReached()) {
        maxFilesCount = true;
        break;
      }
      if (this.isInvalidFileType(files[i])) {
        invalidFileType = true;
        continue;
      }
      if (this.isFileTooBig(files[i])) {
        fileTooLarge = true;
        continue;
      }
      this.files.push(files[i]);
    }

    this.control.setValue(this.getFiles(this.files));
    if (maxFilesCount) {
      this.control.setErrors({ 'maxFilesCount': { maxFilesCount: this.maxFilesCount } }, { emitEvent: true });
    }
    if (invalidFileType) {
      this.control.setErrors({ 'invalidFileType': { invalidFileType: this.bytesPipe.transform(this.maxFileSize) } }, { emitEvent: true });
    }
    if (fileTooLarge) {
      this.control.setErrors({ 'fileTooLarge': { fileTooLarge: this.bytesPipe.transform(this.maxFileSize) } }, { emitEvent: true });
    }
  }

  removeFile(index) {
    this.files.splice(index, 1);
    this.control.setValue(this.getFiles(this.files));
  }

  isUploadLimitReached(): boolean {
    return this.showRemoveButton && this.files.length >= this.maxFilesCount;
  }

  downloadFile(file: File): Observable<Blob> {
    return of(file);
  }

  private isFileTooBig(file: File): boolean {
    return this.maxFileSize && file.size > this.maxFileSize;
  }

  private isMaxFilesCountReached(): boolean {
    return this.files.length === this.maxFilesCount;
  }

  private isInvalidFileType(file: File): boolean {
    if (!this.accept || this.accept === this.ALL_FILE_TYPES) {
      return false;
    }
    const allowedTypes = this.accept.split(',');
    for (const allowedType of allowedTypes) {
      if (file.type.match(allowedType)) {
        return false;
      }
    }
    return true;
  }

  private getFiles(files: File[]): File | File[] {
    return this.maxFilesCount === 1 ? files[0] : files;
  }
}
