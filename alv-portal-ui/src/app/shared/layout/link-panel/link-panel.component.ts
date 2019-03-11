import { Component, Input, OnInit } from '@angular/core';

export enum LinkKind {
  EXTERNAL = 'EXTERNAL',
  INTERNAL = 'INTERNAL'
}

interface AbstractLink {

  text: string;

  /**
   * i18n key for a tooltip
   */
  tooltip?: string;

}

export interface InternalLink extends AbstractLink {
  kind: LinkKind.INTERNAL;

  routerLink: string[] | string;

  queryParams?: { [index: string]: string };

  fragment?: string | string[];
}

export interface ExternalLink extends AbstractLink {
  kind: LinkKind.EXTERNAL;

  url: string;
}


export type LinkPanelItem = ExternalLink | InternalLink;

const exampleExternal: LinkPanelItem = {
  kind: LinkKind.EXTERNAL,
  text: 'external stuff',
  tooltip: 'external stuff tooltip',
  url: 'http:///example.com'
};

const exampleInternal: LinkPanelItem = {
  kind: LinkKind.INTERNAL,
  text: 'internal stuff',
  tooltip: 'internal tooltip',

  fragment: ['one', 'two'],
};

@Component({
  selector: 'alv-link-panel',
  templateUrl: './link-panel.component.html',
  styleUrls: ['./link-panel.component.scss']
})
export class LinkPanelComponent implements OnInit {

  @Input()
  items: LinkPanelItem[];

  LinkKind = LinkKind;

  constructor() {
  }

  ngOnInit() {
  }

}
