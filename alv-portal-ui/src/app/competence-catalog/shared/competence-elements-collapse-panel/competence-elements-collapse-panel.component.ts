import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { collapseExpandAnimation } from '../../../shared/animations/animations';
import { ElementType } from '../../../shared/backend-services/competence-element/competence-element.types';

@Component({
  selector: 'alv-competence-elements-collapse-panel',
  templateUrl: './competence-elements-collapse-panel.component.html',
  styleUrls: ['./competence-elements-collapse-panel.component.scss'],
  animations: [collapseExpandAnimation]
})
export class CompetenceElementsCollapsePanelComponent implements OnInit {

  @Input() competenceSetId: string;

  @Input() elementType: ElementType;

  @Input() isCollapsed = true;

  @Input() showAddButton = false;

  @Input() isEmpty = false;

  @Output() addClicked = new EventEmitter<void>();

  a11yId = this.elementType + this.competenceSetId;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  onAddClicked() {
    this.addClicked.emit();
  }
}
