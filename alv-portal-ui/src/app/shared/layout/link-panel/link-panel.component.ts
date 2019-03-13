import { Component, Input, OnInit } from '@angular/core';
import { LinkPanelData } from './links-repository';

@Component({
  selector: 'alv-link-panel',
  templateUrl: './link-panel.component.html',
  styleUrls: ['./link-panel.component.scss']
})
export class LinkPanelComponent implements OnInit {

  @Input()
  linkPanelData: LinkPanelData;

  constructor() {
  }

  ngOnInit() {
  }

}
