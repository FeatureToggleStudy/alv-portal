import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { FileItem } from 'ng2-file-upload/file-upload/file-item.class';
import { ParsedResponseHeaders } from '../../../../../../node_modules/ng2-file-upload/file-upload/file-uploader.class';
import { SubForm } from '../../sub-form';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

export class EncapsulatedFileItem extends FileItem {
  response: string;
}

/**
 * A component for uploading multiple files with drag and drop area, the file queue and progress bar.
 * Uses valor software's ng2-file-upload
 * Takes the array of Files as an input
 */
@Component({
  selector: 'os-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FilesUploadComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FilesUploadComponent),
    multi: true
  }]
})
export class FilesUploadComponent extends SubForm implements OnInit {

  @Input()
  showCheckboxes = false;

  public hasBaseDropZoneOver = false;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    autoUpload: true,
    method: 'POST',
    isHTML5: true
  });

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({} as { [p: string]: any });
  }

  ngOnInit() {
    // We expect that the server will give me an id of the uploaded file.
    // We save the server response inside the item itself making it in and out parameter
    this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      const encapsItem = <EncapsulatedFileItem>item; // there's no reason other than typesafety I'm doing this cast.
      encapsItem.response = response;
    };

  }

  /**
   * when you drag a file to the dragndrop area, we set the hasBaseDropZoneOver flag
   * @param e
   */
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  /**
   * shifts the position of the file in the queue down
   * @param index
   */
  public moveDown(index: number): void {
    [this.uploader.queue[index], this.uploader.queue[index + 1]] = [this.uploader.queue[index + 1], this.uploader.queue[index]];
  }

  /**
   * shifts the position of the file in the queue up
   * @param index
   */
  public moveUp(index: number): void {
    [this.uploader.queue[index - 1], this.uploader.queue[index]] = [this.uploader.queue[index], this.uploader.queue[index - 1]];
  }

  public rename(file: FileItem): void {
    //todo will be implemented when we know how we bundle file and the form data related to the file
  }

  public cancelAndRemove(file: FileItem) {
    file.cancel();
    file.remove();
  }
}


