import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {  map, zipAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElasticSearchReindexRepository {

  private readonly DOCUMENT_URLS = {
    users: 'api/elasticsearch/index',
    jobs: 'jobadservice/api/elasticsearch/index',
    candidates: 'candidateservice/api/elasticsearch/index',
    reference_data: 'referenceservice/api/elasticsearch/index'
  };

  private readonly REINDEXING_TASK_URL = '/_tasks?detailed=true&actions=*reindex';

  constructor(private http: HttpClient) {}

  reindex(documents: string[]): Observable<any> {

    const urls = documents.map( (document) => {
      return this.DOCUMENT_URLS[document];
    });

    return from(urls).pipe(
      map((url) => this.http.post(url, {})),
      zipAll()
    );
  }
}
