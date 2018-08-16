import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SubForm } from '../../sub-form';

/**
 * DocumentUpload is a FileUpload with a dropdown list indicating the category of the document and a name of a document
 */
@Component({
  selector: 'os-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DocumentUploadComponent),
      multi: true
    }
  ]
})
export class DocumentUploadComponent extends SubForm implements OnInit {

  /**
   * list of possible categories for the select box
   */
  @Input()
  categories: string[];

  @Input()
  name: string;

  constructor(fb: FormBuilder) {
    super();
    this.form = fb.group({
      name: fb.control(''),
      category: fb.control('')
    });
  }

  ngOnInit(): void {

  }

}
