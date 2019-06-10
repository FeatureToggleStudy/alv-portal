import { Component, Input, OnInit } from '@angular/core';

export interface AssistantLink {
  labelKey: string;
  anchor: string
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

  ngOnInit() {
  }

}
