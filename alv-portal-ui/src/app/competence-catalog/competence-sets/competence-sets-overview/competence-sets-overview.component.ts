import { Component, OnInit } from '@angular/core';
import { CompetenceSetRepository } from '../../../shared/backend-services/competence-set/competence-set.repository';
import { FormControl } from '@angular/forms';
import { ElementType } from '../../../shared/backend-services/competence-element/competence-element.types';
import {
  CompetenceSet,
  CompetenceSetSearchResult
} from '../../../shared/backend-services/competence-set/competence-set.types';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';

@Component({
  selector: 'alv-competence-sets-overview',
  templateUrl: './competence-sets-overview.component.html',
  styleUrls: ['./competence-sets-overview.component.scss']
})
export class CompetenceSetsOverviewComponent extends AbstractSubscriber implements OnInit {

  query = new FormControl();

  competenceSets: CompetenceSetSearchResult[] = [];

  private page = 0;

  constructor(private competenceSetRepository: CompetenceSetRepository) {
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
    this.competenceSetRepository.search({
      body: {
        query: this.query.value || ''
      },
      page: this.page++,
      size: 20
    }).pipe(
    ).subscribe(competenceElements => {
      this.competenceSets = [...(this.competenceSets || []), ...competenceElements.content];
    });
  }

  trackBy(competenceSet: CompetenceSetSearchResult): string {
    return competenceSet.id;
  }

  private reload() {
    this.page = 0;
    this.competenceSets = [];
    this.onScroll();
  }
}

/*
[
            {
              id: '676575-567567-klj8767',
              published: false,
              draft: false,
              type: ElementType.ACTION_TO_KNOW,
              description: {
                textDe: 'Deutsch',
                textFr: 'Franz',
                textIt: 'Josef',
                textEn: 'Pippen'
              }
            },
            {
              id: '676575-567567-klj8767',
              published: false,
              draft: false,
              type: ElementType.ACTION_TO_KNOW,
              description: {
                textDe: 'Deutsch',
                textFr: 'Franz',
                textIt: 'Josef',
                textEn: 'Pippen'
              }
            }
          ]
 */
