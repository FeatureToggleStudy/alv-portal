import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompetenceSetSearchResult,
  initialCompetenceSet
} from '../../../shared/backend-services/competence-set/competence-set.types';
import { CompetenceSetRepository } from '../../../shared/backend-services/competence-set/competence-set.repository';

@Component({
  selector: 'alv-competence-set-detail',
  templateUrl: './competence-set-detail.component.html',
  styleUrls: ['./competence-set-detail.component.scss']
})
export class CompetenceSetDetailComponent implements OnInit {

  competenceSet: CompetenceSetSearchResult;

  isEdit: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private competenceSetRepository: CompetenceSetRepository) { }

  ngOnInit() {
    this.isEdit = !!this.route.snapshot.data.competenceSet;
    this.competenceSet = this.route.snapshot.data.competenceSet || initialCompetenceSet;
  }

  saveCompetenceSet() {
    if (this.isEdit) {
      this.updateCompetenceSet();
    } else {
      this.createCompetenceSet();
    }
  }

  private createCompetenceSet() {
    this.competenceSetRepository.create({
      actionToKnowId: this.competenceSet.actionToKnow.id,
      competenceElementIds: this.competenceSet.competenceElementIds
    }).subscribe(result => {
      this.router.navigate(['kk', 'sets']);
    });
  }

  private updateCompetenceSet() {

  }
}
