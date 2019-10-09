import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { collapseExpandAnimation } from '../../../shared/animations/animations';

@Component({
  selector: 'alv-competence-items-collapse-panel',
  templateUrl: './competence-items-collapse-panel.component.html',
  styleUrls: ['./competence-items-collapse-panel.component.scss'],
  animations: [collapseExpandAnimation]
})
export class CompetenceItemsCollapsePanelComponent implements OnInit {

  @Input() id: string;

  @Input() label: string;

  @Input() isCollapsed = true;

  @Input() showAddButton: boolean;

  @Input() isEmpty: boolean;

  @Input() darkMode: boolean;

  @Output() addClick = new EventEmitter<void>();

  @Output() toggleClick = new EventEmitter<boolean>();

  a11yId = this.id;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleClick.emit(this.isCollapsed);
  }

  onAddClicked() {
    this.addClick.emit();
  }
}
