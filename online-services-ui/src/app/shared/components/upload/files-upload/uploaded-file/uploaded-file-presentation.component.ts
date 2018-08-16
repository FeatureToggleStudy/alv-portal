import { Component, Input, OnInit } from '@angular/core';

/**
 * Presentation components for the file that has been uploaded.
 * Shows the following details:
 * - file name
 * - icon of the file type,
 * - date of upload
 * - readable size
 * - links to a preview
 */
@Component({
  selector: 'os-uploaded-file-presentation',
  templateUrl: './uploaded-file-presentation.component.html',
  styleUrls: ['./uploaded-file-presentation.component.scss']
})
export class UploadedFilePresentationComponent implements OnInit {

  @Input()
  id: string;

  @Input()
  fileName: string;

  @Input()
  fileSize: number;

  /**
   * in Date.now() format
   */
  @Input()
  uploadDate: number;

  @Input()
  fileType: string;

  @Input()
  fileUrl: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  getFileDetails() {

  }
}
