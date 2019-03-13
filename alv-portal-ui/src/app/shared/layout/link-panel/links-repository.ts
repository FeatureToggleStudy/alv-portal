import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Link {
  title: string;
  url: string;
}

export interface LinkPanelData {
  title: string;
  links: Link[];
}

const PREFIX = 'assets/data/';

@Injectable({
  providedIn: 'root'
})
export class LinksRepository {

  constructor(private http: HttpClient) {

  }

  getLinks(language, id): Observable<LinkPanelData> {
    return this.http.get<LinkPanelData>(`${PREFIX}/${id}/${language}.json`);
  }
}
