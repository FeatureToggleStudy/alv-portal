import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Link {
  title: string;
  url: string;
  flag?: 'PRIMARY'; // the flag means that we will draw the link red
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

  getLinks(id: string, language: string): Observable<LinkPanelData> {
    return this.http.get<LinkPanelData>(`${PREFIX}/${id}/${language}.json`);
  }
}
