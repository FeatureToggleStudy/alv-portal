import { Component, Host, Input, Optional, SkipSelf } from '@angular/core';
import { BytesPipe } from '../../../pipes/bytes.pipe';
import { AbstractInput } from '../abstract-input';
import { ControlContainer } from '@angular/forms';
import { InputIdGenerationService } from '../input-id-generation.service';
import { InputType } from '../input-type.enum';

@Component({
  selector: 'alv-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent extends AbstractInput {

  private readonly ALL_FILE_TYPES = '*/*';

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

  private iconMappings = {
    'application/pdf': ['far', 'file-pdf'],
    'image/png': ['far', 'file-image'],
    'image/jpeg': ['far', 'file-image']
  };

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
      if (this.maxFileSize && files[i].size > this.maxFileSize) {
        fileTooLarge = true;
        continue;
      }
      if (this.files.length === this.maxFilesCount) {
        maxFilesCount = true;
        break;
      }
      if (!this.checkFileType(files[i])) {
        invalidFileType = true;
        continue;
      }
      this.files.push(files[i]);
    }

    this.control.setValue(this.getFiles(this.files));
    if (maxFilesCount) {
      this.control.setErrors({ 'maxFilesCount': { maxFilesCount: this.maxFilesCount } }, { emitEvent: true });
    }
    if (fileTooLarge) {
      this.control.setErrors({ 'fileTooLarge': { fileTooLarge: this.bytesPipe.transform(this.maxFileSize) } }, { emitEvent: true });
    }
    if (invalidFileType) {
      this.control.setErrors({ 'invalidFileType': { invalidFileType: this.bytesPipe.transform(this.maxFileSize) } }, { emitEvent: true });
    }
  }

  removeFile(index) {
    this.files.splice(index, 1);
    this.control.setValue(this.getFiles(this.files));
  }

  getFileIcon(fileType: string): string[] {
    const fileIcon = this.iconMappings[fileType];
    if (fileIcon) {
      return fileIcon;
    }
    return ['far', 'file'];
  }


  isDisabled(): boolean {
    return this.showRemoveButton && this.files.length >= this.maxFilesCount || this.control.disabled;
  }

  private checkFileType(file: File): boolean {
    if (!this.accept || this.accept === this.ALL_FILE_TYPES) {
      return true;
    }
    const allowedTypes = this.accept.split(',');
    for (const allowedType of allowedTypes) {
      if (file.type.match(allowedType)) {
        return true;
      }
    }
    return false;
  }

  private getFiles(files: File[]): File | File[] {
    return this.maxFilesCount === 1 ? files[0] : files;
  }
}
