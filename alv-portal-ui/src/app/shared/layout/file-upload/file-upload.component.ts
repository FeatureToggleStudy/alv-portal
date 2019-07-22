import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'alv-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  files: any = [];

  constructor() { }

  ngOnInit() {
  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }
}
