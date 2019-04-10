import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ResultListItem } from './result-list-item.model';

const RESULT_LIST_ITEM_ID_PREFIX = 'result-list-item_';

export function composeResultListItemId(id: string) {
  return RESULT_LIST_ITEM_ID_PREFIX + id;
}

/**
 * A UI representation of the search result item. Domain agnostic.
 */
@Component({
  selector: 'alv-result-list-item',
  templateUrl: './result-list-item.component.html',
  styleUrls: ['./result-list-item.component.scss'],
  /* tslint:disable:use-view-encapsulation */
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultListItemComponent implements OnInit {

  @HostBinding('attr.id')
  resultListItemId;

  @Output()
  favouritesClick = new EventEmitter<void>();

  @Output()
  noteClick = new EventEmitter<void>();

  constructor() {
  }

  private _result: ResultListItem;

  @Input() get result(): ResultListItem {
    return this._result;
  }

  set result(value: ResultListItem) {
    this._result = value;
  }

  ngOnInit() {
    this.resultListItemId = composeResultListItemId(this.result.id);
  }

}
