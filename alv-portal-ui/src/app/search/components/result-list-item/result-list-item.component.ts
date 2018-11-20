import { Component, Input, OnInit } from '@angular/core';
import { ResultListItem } from './result-list-item.model';

@Component({
  selector: 'alv-result-list-item',
  templateUrl: './result-list-item.component.html',
  styleUrls: ['./result-list-item.component.scss']
})
export class ResultListItemComponent implements OnInit {

  @Input()
  result: ResultListItem;

  constructor() {
  }

  ngOnInit() {
  }

}
