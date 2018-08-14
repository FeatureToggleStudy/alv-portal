import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { mockFile1 } from '../forms/forms.mock';
import { File } from '../forms/forms.model';

@Injectable({
  providedIn: 'root'
})
export class FileInfoService {

  constructor() { }

  getFileInfo(id): Observable<File> {
    // fake implementation. delay is here to have it fully asynchronous
    return of(mockFile1).pipe(delay(1000));
  }
}
