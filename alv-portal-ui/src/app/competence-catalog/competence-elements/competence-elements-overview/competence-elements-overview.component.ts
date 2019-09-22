import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { CompetenceElementRepository } from '../../../shared/backend-services/competence-element/competence-element.repository';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { CompetenceElement } from '../../../shared/backend-services/competence-element/competence-element.types';
import { CompetenceElementModalComponent } from '../../shared/competence-element-modal/competence-element-modal.component';

@Component({
  selector: 'alv-competence-elements-overview',
  templateUrl: './competence-elements-overview.component.html',
  styleUrls: ['./competence-elements-overview.component.scss']
})
export class CompetenceElementsOverviewComponent extends AbstractSubscriber implements OnInit {

  query = new FormControl();

  competenceElements: CompetenceElement[] = [];

  private page = 0;

  constructor(private modalService: ModalService,
              private competenceElementRepository: CompetenceElementRepository) {
    super();
  }

  ngOnInit() {
    this.onScroll();

    this.query.valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        this.reload();
      });

  }

  onScroll() {
    this.competenceElementRepository.search({
      body: {
        query: this.query.value || ''
      },
      page: this.page++,
      size: 20
    }).pipe(
    ).subscribe(competenceElements => {
      this.competenceElements = [...(this.competenceElements || []), ...competenceElements.content];
    });

  }

  openCreateModal() {
    const createModalRef = this.modalService.openMedium(CompetenceElementModalComponent, true);
    createModalRef.result
      .then(competenceElement => {
        this.reload();
      })
      .catch(() => {
      });
  }

  openUpdateModal(competenceElement: CompetenceElement) {
    const createModalRef = this.modalService.openMedium(CompetenceElementModalComponent, true);
    createModalRef.componentInstance.competenceElement = competenceElement;
    createModalRef.result
      .then(updatedCompetenceElement => {
        this.reload();
      })
      .catch(() => {
      });
  }

  private reload() {
    this.page = 0;
    this.competenceElements = [];
    this.onScroll();
  }
}
