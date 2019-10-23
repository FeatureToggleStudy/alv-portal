import { Component, Input, OnInit } from '@angular/core';
import {
  ChFiche,
  Competence,
  CompetenceType,
  Occupation
} from '../../../shared/backend-services/ch-fiche/ch-fiche.types';
import { CompetenceElement } from '../../../shared/backend-services/competence-element/competence-element.types';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { CompetenceSetSearchModalComponent } from '../competence-set-search-modal/competence-set-search-modal.component';
import { CompetenceSetRepository } from '../../../shared/backend-services/competence-set/competence-set.repository';
import { forkJoin, Observable, of } from 'rxjs';
import { flatMap, take, tap } from 'rxjs/operators';
import { OccupationSearchModalComponent } from '../occupation-search-modal/occupation-search-modal.component';
import { CompetenceCatalogAction } from '../../shared/shared-competence-catalog.types';
import { ActionDefinition } from '../../../shared/backend-services/shared.types';
import { CompetenceSetSearchResult } from '../../../shared/backend-services/competence-set/competence-set.types';
import {
  OccupationLabelRepository,
  OccupationTypes
} from '../../../shared/backend-services/reference-service/occupation-label.repository';
import { I18nService } from '../../../core/i18n.service';
import { OccupationLabelData } from '../../../shared/backend-services/reference-service/occupation-label.types';

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

  occupationLabels: OccupationLabelData[] = [];

  competences = {
    [CompetenceType.BASIC]: [],
    [CompetenceType.SPECIALIST]: []
  };

  linkOccupationAction: ActionDefinition<CompetenceCatalogAction> = {
    name: CompetenceCatalogAction.LINK,
    icon: ['fas', 'search-plus'],
    label: 'portal.competence-catalog.ch-fiches.actions.search-and-add'
  };

  linkCompetenceAction: ActionDefinition<CompetenceCatalogAction> = {
    name: CompetenceCatalogAction.LINK,
    icon: ['fas', 'search-plus'],
    label: 'portal.competence-catalog.ch-fiches.actions.search-and-add'
  };

  unlinkAction: ActionDefinition<CompetenceCatalogAction> = {
    name: CompetenceCatalogAction.UNLINK,
    icon: ['fas', 'unlink'],
    label: 'portal.competence-catalog.ch-fiches.actions.unlink'
  };

  constructor(private modalService: ModalService,
              private i18nService: I18nService,
              private occupationLabelRepository: OccupationLabelRepository,
              private competenceSetRepository: CompetenceSetRepository) {
  }

  ngOnInit() {
    this.i18nService.currentLanguage$.pipe(
      flatMap(lang => this.translateOccupations(this.chFiche ? this.chFiche.occupations : [], lang))
    ).subscribe();
  }

  addOccupation() {
    const modalRef = this.modalService.openMedium(OccupationSearchModalComponent);
    modalRef.componentInstance.existingOccupations = this.chFiche.occupations.map(occupation => occupation.bfsCode);
    modalRef.result
      .then((result) => {
        this.chFiche.occupations.push({
          bfsCode: result.payload.mappings[OccupationTypes.BFS],
          chIsco3: result.payload.mappings[OccupationTypes.CHISCO3],
          chIsco5: result.payload.mappings[OccupationTypes.CHISCO5]
        });
        this.updateOccupationLabels(this.chFiche.occupations)
          .subscribe(() => {
            this.collapsed.OCCUPATIONS = false;
          });
      })
      .catch(() => {
      });
  }

  unlinkOccupation(index: number) {
    this.openUnlinkConfirmModal().then(result => {
      this.chFiche.occupations.splice(index, 1);
      this.updateOccupationLabels(this.chFiche.occupations).subscribe();
    }).catch(err => {
    });
  }

  unlinkCompetence(type: CompetenceType, index: number) {
    this.openUnlinkConfirmModal().then(result => {
      this.chFiche.competences.splice(index, 1);
      this.loadCompetences(type).subscribe();
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

  handleOccupationActionClick(action: CompetenceCatalogAction) {
    if (action === CompetenceCatalogAction.LINK) {
      this.addOccupation();
    }
  }

  handleCompetenceSetActionClick(action: CompetenceCatalogAction, competenceType: CompetenceType, competenceSet?: CompetenceSetSearchResult) {
    if (action === CompetenceCatalogAction.LINK) {
      this.addCompetence(competenceType);
    }
    if (action === CompetenceCatalogAction.UNLINK) {
      this.unlinkCompetence(competenceType, this.chFiche.competences.findIndex(competence => competence.competenceSetId === competenceSet.id));
    }
  }

  private updateOccupationLabels(occupations: Occupation[]): Observable<OccupationLabelData[]> {
    return this.i18nService.currentLanguage$.pipe(
      take(1),
      flatMap(lang => this.translateOccupations(occupations, lang))
    );
  }

  private translateOccupations(occupations: Occupation[], lang: string): Observable<OccupationLabelData[]> {
    if (!occupations.length) {
      this.occupationLabels = [];
      return of(this.occupationLabels);
    }
    return forkJoin(occupations.map(o => this.occupationLabelRepository.getOccupationLabelsByKey(OccupationTypes.BFS, o.bfsCode, lang)))
      .pipe(
        tap((occupationLabels: OccupationLabelData[]) => {
          this.occupationLabels = occupationLabels;
          console.log(this.occupationLabels);
        })
      );
  }

  private loadCompetences(competenceType: CompetenceType) {
    const competences = this.chFiche.competences
      .filter(competence => competence.type === competenceType)
      .map(competence => this.competenceSetRepository.findById(competence.competenceSetId));
    const result = competences.length ? forkJoin(competences) : of([]);
    return result.pipe(
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
