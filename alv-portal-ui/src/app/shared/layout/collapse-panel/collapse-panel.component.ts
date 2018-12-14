import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alv-collapse-panel',
  templateUrl: './collapse-panel.component.html',
  styleUrls: ['./collapse-panel.component.scss']
})
export class CollapsePanelComponent implements OnInit {

  @Input() panelId: string;

  @Input() panelTitle: string;

  isCollapsed = false;

  constructor() { }

  ngOnInit() {
  }

}
