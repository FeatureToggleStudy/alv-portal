import { Component, Input, OnInit } from '@angular/core';

export interface Link {
  text: string;
  url: string;
}


@Component({
  selector: 'alv-link-panel',
  templateUrl: './link-panel.component.html',
  styleUrls: ['./link-panel.component.scss']
})
export class LinkPanelComponent implements OnInit {

  @Input()
  items: Link[];

  constructor() {
  }

  ngOnInit() {
  }

}
