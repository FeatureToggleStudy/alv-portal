import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { File } from '../../../../../../online-forms/forms/forms.model';
import { FileInfoService } from '../../../../../file-info.service';

@Component({
  selector: 'os-uploaded-file',
  templateUrl: './uploaded-file.component.html',
  styleUrls: ['./uploaded-file.component.scss']
})
export class UploadedFileComponent implements OnInit {

  file$: Observable<File>;

  constructor(private fileInfoService: FileInfoService) { }

  ngOnInit() {
    this.file$ = this.fileInfoService.getFileInfo('345');
  }

}
