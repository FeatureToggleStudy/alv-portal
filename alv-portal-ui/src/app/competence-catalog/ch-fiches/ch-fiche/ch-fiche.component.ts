import { Component, Input, OnInit } from '@angular/core';
import {
  ChFiche,
  Competence,
  CompetenceType
} from '../../../shared/backend-services/ch-fiche/ch-fiche.types';
import { CompetenceElement } from '../../../shared/backend-services/competence-element/competence-element.types';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { CompetenceSetSearchModalComponent } from '../competence-set-search-modal/competence-set-search-modal.component';
import { CompetenceSetRepository } from '../../../shared/backend-services/competence-set/competence-set.repository';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OccupationSearchModalComponent } from '../occupation-search-modal/occupation-search-modal.component';
import { ChFicheTitleModalComponent } from '../ch-fiche-title-modal/ch-fiche-title-modal.component';

@Component({
  selector: 'alv-ch-fiche',
  templateUrl: './ch-fiche.component.html',
  styleUrls: ['./ch-fiche.component.scss']
})
export class ChFicheComponent implements OnInit {

  @Input() chFiche: ChFiche;

  collapsed = {
    OCCUPATIONS: true,
    [CompetenceType.BASIC]: true,
    [CompetenceType.SPECIALIST]: true
  };

  competenceTypes = Object.values(CompetenceType);

  competences = {
    [CompetenceType.BASIC]: [],
    [CompetenceType.SPECIALIST]: []
  };

  constructor(private modalService: ModalService,
              private competenceSetRepository: CompetenceSetRepository) {
  }

  ngOnInit() {
  }

  addOccupation() {
    const modalRef = this.modalService.openMedium(OccupationSearchModalComponent);
    modalRef.componentInstance.existingOccupations = this.chFiche.occupations.map(occupation => occupation.bfsCode);
    modalRef.result
      .then((bfsCode) => {
        this.chFiche.occupations.push({
          bfsCode
        });
        this.collapsed.OCCUPATIONS = false;
      })
      .catch(() => {
      });
  }

  unlinkOccupation(index: number) {
    this.openUnlinkConfirmModal().then(result => {
      this.chFiche.occupations.splice(index, 1);
    }).catch(err => {
    });
  }

  unlinkCompetence(type: CompetenceType, index: number) {
    this.openUnlinkConfirmModal().then(result => {
      this.chFiche.occupations.splice(index, 1);
    }).catch(err => {
    });
  }

  addCompetence(competenceType: CompetenceType) {
    const modalRef = this.modalService.openMedium(CompetenceSetSearchModalComponent);
    modalRef.componentInstance.existingSetIds = this.chFiche.competences.map(competence => competence.competenceSetId);
    modalRef.result
      .then((competenceSet) => {
        this.chFiche.competences.push({
          type: competenceType,
          competenceSetId: competenceSet.id
        });
        this.loadCompetences(competenceType).subscribe(result => {
          this.collapsed[competenceType] = false;
        });
      })
      .catch(() => {
      });
  }

  toggleCompetences(competenceType: CompetenceType, collapsed: boolean) {
    if (!collapsed) {
      this.loadCompetences(competenceType).subscribe();
    }
  }

  getCompetencesByType(competenceType: CompetenceType): Competence[] {
    return this.chFiche.competences.filter(competence => competence.type === competenceType);
  }

  addFicheName() {
    const modalRef = this.modalService.openMedium(ChFicheTitleModalComponent);
    modalRef.result
      .then((multiLanguageTitle) => {
        console.log('returned' , multiLanguageTitle);
        this.chFiche.title = multiLanguageTitle;
      })
      .catch(() => {
      });
  }

  private loadCompetences(competenceType: CompetenceType) {
    return forkJoin(
      this.chFiche.competences
        .filter(competence => competence.type === competenceType)
        .map(competence => this.competenceSetRepository.findById(competence.competenceSetId))
    )
      .pipe(
        tap(competenceSets => {
          this.competences[competenceType] = competenceSets;
        })
      );
  }

  private openUnlinkConfirmModal(): Promise<CompetenceElement> {
    return this.modalService.openConfirm({
      title: 'portal.competence-catalog.competence-sets.overview.delete-confirmation.title',
      content: 'portal.competence-catalog.competence-sets.overview.delete-confirmation.text'
    }).result;
  }
}
