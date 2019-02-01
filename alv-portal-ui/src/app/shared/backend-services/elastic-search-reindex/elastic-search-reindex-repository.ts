import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

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

  reindex(document: string): Observable<void> {
    let urls = [this.DOCUMENT_URLS[document]];
    console.log('urls before if-ology', urls);
    if (document === 'all') {
      urls = Object.keys(this.DOCUMENT_URLS)
        .map((key) => this.DOCUMENT_URLS[key]);
    }
    console.log('urls after if-ology', urls);

    return of();

    // return from(urls).pipe(
    //   map((url) => this.http.post(url, {})), zipAll());
  }

}
