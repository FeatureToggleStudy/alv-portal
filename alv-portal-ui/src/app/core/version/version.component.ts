import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BackendVersion } from './backend-version.model';
import { VERSION } from '../../../environments/version';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs/internal/observable/empty';

@Component({
  selector: 'os-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {

  frontendVersion = VERSION.version;
  backendVersion: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getBackendVersion().subscribe(version => {
      this.backendVersion = version ? version.build.version : 'not found';
    });
  }

  private getBackendVersion(): Observable<BackendVersion> {
    return this.httpClient.get<BackendVersion>('/manage/info').pipe(
        catchError(err => {
          return EMPTY;
        })
    );
  }

}
