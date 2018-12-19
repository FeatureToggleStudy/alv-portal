import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ResultListItem } from './result-list-item.model';

const RESULT_LIST_ITEM_ID_PREFIX = 'result-list-item_';

export const composeResultListItemId = (id: string) => {
  return RESULT_LIST_ITEM_ID_PREFIX + id;
};

/**
 * A UI representation of the search result item. Domain agnostic.
 */
@Component({
  selector: 'alv-result-list-item',
  templateUrl: './result-list-item.component.html',
  styleUrls: ['./result-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultListItemComponent implements OnInit {

  @Input()
  result: ResultListItem;

  @HostBinding('attr.id')
  resultListItemId;

  constructor() {
  }

  ngOnInit() {
    this.resultListItemId = composeResultListItemId(this.result.id);
  }

}
