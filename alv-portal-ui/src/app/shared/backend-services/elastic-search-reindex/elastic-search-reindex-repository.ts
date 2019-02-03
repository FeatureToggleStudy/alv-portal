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
      return this.DOCUMENT_URLS[document]
    });

    return from(urls).pipe(
      map((url) => this.http.post(url, {})),
      zipAll()
    );
  }

  /**
   * return JSON Response of tasks with detailed attributes of status
   * Form should look something like this :
   *  "tasks" : {
   *    "task_id" : {
   *      ...
   *      "action" : "indices:data/write/reindex",
   *      "status" : {
   *        "total" : 258819,
   *        "updated" : 557,
   *        "created" : 16000,
   *        "deleted" : 98,
   *        ...
   *      },
   *      "description" : "",
   *      "start_time_in_millis" : 1549031354091,
   *      "running_time_in_nanos" : 2851853709,
   *      ...
   *    }
   *  }
   *
   */
  getReindexJobs(): Observable<any> {
    return this.http.get(this.REINDEXING_TASK_URL);
  }

}
