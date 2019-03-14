import { Component, Input, OnInit } from '@angular/core';
import { Link, LinkPanelData, LinksRepository } from './links-repository';
import { Observable } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { I18nService } from '../../../core/i18n.service';

type GoodColumnNumber = 1 | 2;

export enum LinkPanelId {
  DASHBOARD_COMPANY = 'dashboard/company',
  DASHBOARD_JOBSEEKER = 'dashboard/job-seeker',
  HOME_COMPANY = 'home/company',
  HOME_JOBSEEKER = 'home/job-seeker',
  HOME_PAV = 'home/pav'
}


@Component({
  selector: 'alv-link-panel',
  templateUrl: './link-panel.component.html',
  styleUrls: ['./link-panel.component.scss']
})
export class LinkPanelComponent implements OnInit {

  @Input()
  linkPanelId: LinkPanelId;

  @Input()
  numberOfColumns: GoodColumnNumber = 2;

  linkPanelData$: Observable<LinkPanelData>;

  columns: Link[][];

  /**
   * font-awesome icon class to be used in the title of the link panel
   */
  @Input()
  icon = 'book';

  constructor(private linksRepository: LinksRepository,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.linkPanelData$ = this.i18nService.currentLanguage$.pipe(
      flatMap((language) => this.linksRepository.getLinks(this.linkPanelId, language)),
      tap(linkPanelData => this.columns = this.splitLinksByColumns(linkPanelData)));
  }

  splitLinksByColumns(linkPanelData: LinkPanelData): Link[][] {
    const result = [];
    const numberOfLinks = linkPanelData.links.length;

    for (let columnNumber = 0; columnNumber < this.numberOfColumns; columnNumber++) {
      const sliceBegin = (columnNumber) * numberOfLinks / this.numberOfColumns;
      const sliceEnd = (columnNumber + 1) * numberOfLinks / this.numberOfColumns;
      result[columnNumber] = linkPanelData.links.slice(sliceBegin, sliceEnd);
    }
    return result;
  }

}
