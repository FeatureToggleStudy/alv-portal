import { Component, OnInit } from '@angular/core';
import {
  LinkPanelData,
  LinksRepository
} from '../../shared/layout/link-panel/links-repository';
import { Observable } from 'rxjs';
import { I18nService } from '../../core/i18n.service';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'alv-job-seeker-home',
  templateUrl: './job-seeker-home.component.html',
  styleUrls: ['./job-seeker-home.component.scss']
})
export class JobSeekerHomeComponent implements OnInit {

  linksData$: Observable<LinkPanelData>;

  constructor(private linksRepository: LinksRepository,
              private i18nService: I18nService) {

  }

  ngOnInit() {
    this.linksData$ = this.i18nService.currentLanguage$.pipe(
      flatMap((language) => this.linksRepository.getLinks(language, 'home/stes/anon/')));
  }
}
