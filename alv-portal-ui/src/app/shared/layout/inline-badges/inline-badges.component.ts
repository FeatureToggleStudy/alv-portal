import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InlineBadge } from './inline-badge.types';

@Component({
  selector: 'alv-inline-badges',
  templateUrl: './inline-badges.component.html',
  styleUrls: ['./inline-badges.component.scss']
})
export class InlineBadgesComponent implements OnInit {

  @Input()
  badges: InlineBadge[];

  @Input()
  canRemove = false;

  @Output()
  removed = new EventEmitter<InlineBadge>();

  constructor() {
  }

  ngOnInit() {
  }

  onRemoved(inlineBadge: InlineBadge) {
    this.removed.emit(inlineBadge);
  }

}
