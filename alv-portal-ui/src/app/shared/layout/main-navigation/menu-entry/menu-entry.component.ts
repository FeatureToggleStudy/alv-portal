import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuEntry } from '../menu-entry.type';

@Component({
  selector: 'alv-menu-entry',
  templateUrl: './menu-entry.component.html',
  styleUrls: ['./menu-entry.component.scss']
})
export class MenuEntryComponent implements OnInit {

  @Input()
  menuEntry: MenuEntry;

  @Output()
  itemClicked = new EventEmitter<void>();

  @Input()
  isChild: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  onItemClicked() {
    this.itemClicked.emit();
  }

}
