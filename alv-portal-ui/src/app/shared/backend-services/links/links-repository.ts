import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LinkPanelData } from './links.types';


const PREFIX = 'assets/data';

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
