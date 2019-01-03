import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alv-list-item-content',
  templateUrl: './list-item-content.component.html',
  styleUrls: ['./list-item-content.component.scss']
})
export class ListItemContentComponent implements OnInit {

  @Input()
  label: string;

  constructor() {
  }

  ngOnInit() {
  }

}
