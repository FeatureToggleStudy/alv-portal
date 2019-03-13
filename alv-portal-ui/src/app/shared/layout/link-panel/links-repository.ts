import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { I18nService } from '../../../core/i18n.service';
import { flatMap } from 'rxjs/operators';


export interface Link {
  title: string;
  url: string;
  flag?: 'PRIMARY';
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

  constructor(private http: HttpClient,
              private i18nService: I18nService) {

  }

  getLinks(id): Observable<LinkPanelData> {
    return this.i18nService.currentLanguage$.pipe(
      flatMap((language) => this.http.get<LinkPanelData>(`${PREFIX}/${id}/${language}.json`)));
  }
}
