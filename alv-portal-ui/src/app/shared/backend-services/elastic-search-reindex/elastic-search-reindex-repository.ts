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

  constructor(private http: HttpClient) {}

  reindex(document: string): Observable<any> {
    let urls = [this.DOCUMENT_URLS[document]];
    console.log('urls before if-ology', urls);
    if (document === 'all') {
      urls = Object.keys(this.DOCUMENT_URLS)
        .map((key) => this.DOCUMENT_URLS[key]);
    }
    console.log('urls after if-ology', urls);

    return from(urls).pipe(
      map((url) =>  this.http.post(url, {})),
      zipAll()
    );
  }

}
