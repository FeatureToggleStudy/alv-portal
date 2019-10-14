import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompetenceElement } from '../../../shared/backend-services/competence-element/competence-element.types';
import {
  CompetenceCatalogAction,
  CompetenceCatalogActions
} from '../../../shared/backend-services/shared.types';

@Component({
  selector: 'alv-competence-element',
  templateUrl: './competence-element.component.html',
  styleUrls: ['./competence-element.component.scss']
})
export class CompetenceElementComponent implements OnInit {

  @Input() competenceElement: CompetenceElement;

  @Input() isEditable: boolean;

  @Input() showUnlinkAction: boolean;

  @Output() elementClick = new EventEmitter<CompetenceElement>();

  @Output() unlinkClick = new EventEmitter<CompetenceElement>();

  competenceElementActions: CompetenceCatalogAction[] = [
    {
      name: CompetenceCatalogActions.UNLINK,
      icon: ['fas', 'unlink']
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onElementClick() {
    this.elementClick.emit(this.competenceElement);
  }

  onUnlinkClick() {
    this.unlinkClick.emit(this.competenceElement);
  }

}
