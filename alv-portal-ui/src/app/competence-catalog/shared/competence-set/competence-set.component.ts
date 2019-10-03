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

  @Input() showErrors: boolean;

  elementType = ElementType;

  knowHowIndicators: CompetenceElement[];

  knowledgeItems: CompetenceElement[];

  collapsed = {
    [ElementType.KNOW_HOW_INDICATOR]: true,
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
        if (type === ElementType.KNOW_HOW) {
          this.competenceSet.knowHow = updatedCompetenceElement;
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

  unlinkKnowHow(competenceElement: CompetenceElement) {
    this.openUnlinkConfirmModal().then(result => {
      this.competenceSet.knowHow = null;
    }).catch(err => {
    });
  }

  addKnowHow() {
    const modalRef = this.modalService.openMedium(CompetenceElementSearchModalComponent);
    modalRef.componentInstance.elementType = ElementType.KNOW_HOW;
    modalRef.result
      .then((competenceElement) => {
        this.competenceSet.knowHow = competenceElement;
      })
      .catch(() => {
      });
  }

  addKnowHowIndicator() {
    this.addCompetenceElement(ElementType.KNOW_HOW_INDICATOR);
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
        this.knowHowIndicators = competenceElements.filter(element => element.type === ElementType.KNOW_HOW_INDICATOR);
        this.knowledgeItems = competenceElements.filter(element => element.type === ElementType.KNOWLEDGE);
      })
    );
  }
}
