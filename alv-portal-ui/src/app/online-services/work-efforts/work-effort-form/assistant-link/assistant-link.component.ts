import { Component, Input, OnInit } from '@angular/core';

export interface AssistantLink {
  labelKey: string;
  routerLink: any[] | string; //see angular router link
}
@Component({
  selector: 'alv-assistant-link',
  templateUrl: './assistant-link.component.html',
  styleUrls: ['./assistant-link.component.scss']
})
export class AssistantLinkComponent implements OnInit {

  constructor() {
  }

  @Input()
  link: AssistantLink;

  @Input()
  isActive: boolean;

  ngOnInit() {
  }

}
