import { Component, OnInit } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import {
  LinkPanelData,
  LinksRepository
} from '../../shared/layout/link-panel/links-repository';
import { I18nService } from '../../core/i18n.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'alv-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  linksData$: Observable<LinkPanelData>;

  constructor(private linksRepository: LinksRepository,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.linksData$ = this.i18nService.currentLanguage$.pipe(
      flatMap((language) => this.linksRepository.getLinks(language, 'dashboard/company/')));
  }

}
