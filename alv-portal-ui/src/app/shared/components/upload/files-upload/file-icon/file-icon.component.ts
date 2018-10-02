import { Component, Input, OnInit } from '@angular/core';

/**
 * draws an icon corresponding to a given file type in fileType input. Draws file icon by default
 * depends on fontawesome
 */
@Component({
  selector: 'alv-file-icon',
  templateUrl: './file-icon.component.html',
  styleUrls: ['./file-icon.component.scss']
})
export class FileIconComponent implements OnInit {

  @Input() fileType: string;
  iconClass: string;

  fileTypeMap: Object = {
    pdf: 'fas fa-file-pdf'
    // here other file types will be added
  };

  constructor() {
  }

  ngOnInit(): void {
    this.iconClass = this.fileTypeMap[this.fileType] || 'fas fa-file-image';
  }

}
