import { Component, Input, OnInit } from '@angular/core';
import { CompetenceSetSearchResult } from '../../../shared/backend-services/competence-set/competence-set.types';
import {
  CompetenceElement,
  ElementType
} from '../../../shared/backend-services/competence-element/competence-element.types';
import { CompetenceElementRepository } from '../../../shared/backend-services/competence-element/competence-element.repository';
import { collapseExpandAnimation } from '../../../shared/animations/animations';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { CompetenceElementSearchModalComponent } from '../../competence-sets/competence-element-search-modal/competence-element-search-modal.component';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CompetenceElementModalComponent } from '../competence-element-modal/competence-element-modal.component';

@Component({
  selector: 'alv-competence-set',
  templateUrl: './competence-set.component.html',
  styleUrls: ['./competence-set.component.scss'],
  animations: [collapseExpandAnimation]
})
export class CompetenceSetComponent implements OnInit {

  @Input() competenceSet: CompetenceSetSearchResult;

  @Input() isEditable: boolean;

  @Input() showEditSetButton: boolean;

  @Input() isCollapsed = true;

  elementType = ElementType;

  actionToKnowIndicators: CompetenceElement[];

  knowledgeItems: CompetenceElement[];

  collapsed = {
    [ElementType.ACTION_TO_KNOW_INDICATOR]: true,
    [ElementType.KNOWLEDGE]: true
  };

  constructor(private competenceElementRepository: CompetenceElementRepository,
              private modalService: ModalService) {
  }

  ngOnInit() {
    if (!this.isCollapsed) {
      this.loadCompetenceElements().subscribe();
    }
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    if (!this.isCollapsed) {
      this.loadCompetenceElements().subscribe();
    }
  }

  openUpdateElementModal(competenceElement: CompetenceElement, type: ElementType) {
    if (!this.isEditable) {
      return;
    }
    const createModalRef = this.modalService.openMedium(CompetenceElementModalComponent, true);
    createModalRef.componentInstance.competenceElement = competenceElement;
    createModalRef.result
      .then(updatedCompetenceElement => {
        if (type === ElementType.ACTION_TO_KNOW) {
          this.competenceSet.actionToKnow = updatedCompetenceElement;
        } else {
          this.loadCompetenceElements().subscribe();
        }
      })
      .catch(() => {
      });
  }

  unlinkCompetenceElement(competenceElement: CompetenceElement) {
    this.openUnlinkConfirmModal().then(result => {
      const indexToRemove = this.competenceSet.competenceElementIds.indexOf(competenceElement.id);
      this.competenceSet.competenceElementIds.splice(indexToRemove, 1);
      this.loadCompetenceElements().subscribe();
    }).catch(err => {
    });
  }

  unlinkActionToKnow(competenceElement: CompetenceElement) {
    this.openUnlinkConfirmModal().then(result => {
      this.competenceSet.actionToKnow = null;
    }).catch(err => {
    });
  }

  addActionToKnow() {
    const modalRef = this.modalService.openMedium(CompetenceElementSearchModalComponent);
    modalRef.componentInstance.elementType = ElementType.ACTION_TO_KNOW;
    modalRef.result
      .then((competenceElement) => {
        this.competenceSet.actionToKnow = competenceElement;
      })
      .catch(() => {
      });
  }

  addActionToKnowIndicator() {
    this.addCompetenceElement(ElementType.ACTION_TO_KNOW_INDICATOR);
  }

  addKnowledgeItem() {
    this.addCompetenceElement(ElementType.KNOWLEDGE);
  }

  private openUnlinkConfirmModal(): Promise<CompetenceElement> {
    return this.modalService.openConfirm({
      title: 'Verknüpfung entfernen',
      content: 'Wollen Sie diese Verknüpfung wirklich entfernen?'
    }).result;
  }

  private addCompetenceElement(type: ElementType) {
    const modalRef = this.modalService.openMedium(CompetenceElementSearchModalComponent);
    modalRef.componentInstance.elementType = type;
    modalRef.componentInstance.existingElementIds = this.competenceSet.competenceElementIds;
    modalRef.result
      .then((competenceElement) => {
        this.competenceSet.competenceElementIds.push(competenceElement.id);
        this.loadCompetenceElements().subscribe(result => {
          this.collapsed[type] = false;
        });
      })
      .catch(() => {
      });
  }

  private loadCompetenceElements(): Observable<CompetenceElement[]> {
    const result = this.competenceSet.competenceElementIds.length ?
      this.competenceElementRepository.findByIds(this.competenceSet.competenceElementIds) :
      of([]);
    return result.pipe(
      tap(competenceElements => {
        this.actionToKnowIndicators = competenceElements.filter(element => element.type === ElementType.ACTION_TO_KNOW_INDICATOR);
        this.knowledgeItems = competenceElements.filter(element => element.type === ElementType.KNOWLEDGE);
      })
    );
  }
}
