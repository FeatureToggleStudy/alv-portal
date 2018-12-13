import { Component, Input, OnInit } from '@angular/core';
let nextPanelId = 0;

@Component({
  selector: 'alv-collapse-panel',
  templateUrl: './collapse-panel.component.html',
  styleUrls: ['./collapse-panel.component.scss']
})
export class CollapsePanelComponent implements OnInit {

  @Input() panelTitle: string;

  isCollapsed = false;

  panelId = 'alv-collapse-panel-' + nextPanelId++;

  constructor() { }

  ngOnInit() {
  }

}
