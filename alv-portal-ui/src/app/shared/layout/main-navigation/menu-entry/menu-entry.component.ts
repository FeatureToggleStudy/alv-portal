import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuEntry } from '../menu-entry.type';

@Component({
  selector: 'alv-menu-entry',
  templateUrl: './menu-entry.component.html'
})
export class MenuEntryComponent implements OnInit {

  @Input()
  showTooltip  = false;

  @Input()
  menuEntry: MenuEntry;

  @Output()
  itemClicked = new EventEmitter<void>();

  @Input()
  isChild = false;

  constructor() {
  }

  ngOnInit() {
  }

  onItemClicked() {
    this.itemClicked.emit();
  }

}
