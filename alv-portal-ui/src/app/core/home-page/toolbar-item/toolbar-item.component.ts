import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alv-toolbar-item',
  templateUrl: './toolbar-item.component.html',
  styleUrls: ['./toolbar-item.component.scss']
})
export class ToolbarItemComponent implements OnInit {
  @Input() icon: string;
  @Input() active: boolean;

  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
  }
}
