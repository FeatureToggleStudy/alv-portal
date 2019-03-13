import { Component, Input, OnInit } from '@angular/core';
import { LinkPanelData } from './links-repository';

type GoodColumnNumber = 1 | 2;

@Component({
  selector: 'alv-link-panel',
  templateUrl: './link-panel.component.html',
  styleUrls: ['./link-panel.component.scss']
})
export class LinkPanelComponent implements OnInit {

  @Input()
  linkPanelData: LinkPanelData;

  @Input()
  numberOfColumns: GoodColumnNumber = 2;

  constructor() {
  }

  ngOnInit() {
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
