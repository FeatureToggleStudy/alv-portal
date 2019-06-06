import { Component, Input, OnInit } from '@angular/core';
import { LinksRepository } from '../../backend-services/links/links-repository';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { I18nService } from '../../../core/i18n.service';
import { Link, LinkPanelData } from '../../backend-services/links/links.types';

type NumberOfColumns = 1 | 2;

export enum LinkPanelId {
  DASHBOARD_COMPANY = 'dashboard/company',
  DASHBOARD_PAV = 'dashboard/pav',
  DASHBOARD_JOBSEEKER = 'dashboard/job-seeker',
  HOME_COMPANY = 'home/company',
  HOME_JOBSEEKER = 'home/job-seeker',
  HOME_PAV = 'home/pav',
  JOB_PUBLICATION_COMPANY = 'job-publication/company',
  JOB_PUBLICATION_PAV = 'job-publication/pav',
  WORK_EFFORT_EDIT =  'work-efforts/pav'
}

interface LinkPanelColumned {
  title: string;
  columns: Link[][];
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
  numberOfColumns: NumberOfColumns = 2;

  @Input()
  image: string;

  linkPanelColumned$: Observable<LinkPanelColumned>;


  /**
   * font-awesome icon class to be used in the title of the link panel
   */
  @Input()
  icon = 'book';

  constructor(private linksRepository: LinksRepository,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.linkPanelColumned$ = this.i18nService.currentLanguage$.pipe(
      flatMap((language) => this.linksRepository.getLinks(this.linkPanelId, language)),
      map(this.splitLinksByColumns.bind(this))
    );
  }

  splitLinksByColumns(linkPanelData: LinkPanelData): LinkPanelColumned {
    const result: LinkPanelColumned = {
      title: linkPanelData.title,
      columns: []
    };

    const numberOfLinks = linkPanelData.links.length;

    for (let columnNumber = 0; columnNumber < this.numberOfColumns; columnNumber++) {
      const sliceBegin = (columnNumber) * numberOfLinks / this.numberOfColumns;
      const sliceEnd = (columnNumber + 1) * numberOfLinks / this.numberOfColumns;
      result.columns[columnNumber] = linkPanelData.links.slice(sliceBegin, sliceEnd);
    }
    return result;
  }

}
