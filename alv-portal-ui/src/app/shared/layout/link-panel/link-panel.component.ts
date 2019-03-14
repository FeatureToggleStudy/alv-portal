import { Component, Input, OnInit } from '@angular/core';
import { LinkPanelData, LinksRepository } from './links-repository';
import { Observable } from 'rxjs';

type GoodColumnNumber = 1 | 2;

@Component({
  selector: 'alv-link-panel',
  templateUrl: './link-panel.component.html',
  styleUrls: ['./link-panel.component.scss']
})
export class LinkPanelComponent implements OnInit {

  @Input()
  linkPanelId: string;

  @Input()
  numberOfColumns: GoodColumnNumber = 2;

  linkPanelData$: Observable<LinkPanelData>;

  /**
   * font-awesome icon class to be used in the title of the link panel
   */
  @Input()
  icon = 'book';

  constructor(private linksRepository: LinksRepository) {
  }

  ngOnInit() {
    this.linkPanelData$ = this.linksRepository.getLinks('dashboard/company/');
  }

  range(lowEnd, highEnd): number[] {
    const arr = [];
    let c = highEnd - lowEnd + 1;
    while (c--) {
      arr[c] = highEnd--;
    }
    return arr;
  }

}
