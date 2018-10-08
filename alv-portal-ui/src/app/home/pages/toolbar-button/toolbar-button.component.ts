import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alv-toolbar-button',
  templateUrl: './toolbar-button.component.html',
  styleUrls: ['./toolbar-button.component.scss']
})
export class ToolbarButtonComponent implements OnInit {
  @Input() icon: string;
  @Input() active: boolean;

  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
  }
}
