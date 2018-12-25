import { Component, OnInit } from '@angular/core';
import { CandidateQueryPanelValues } from './candidate-query-panel/candidate-query-panel-values';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { OccupationSuggestionService } from '../../shared/occupations/occupation-suggestion.service';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { OccupationMultiTypeaheadItem } from '../../shared/occupations/occupation-multi-typeahead-item';
import { AbstractSubscriber } from '../../core/abstract-subscriber';

@Component({
  selector: 'alv-candidate-search-widget',
  templateUrl: './candidate-search-widget.component.html',
  styleUrls: ['./candidate-search-widget.component.scss']
})
export class CandidateSearchWidgetComponent extends AbstractSubscriber implements OnInit {

  candidateQueryPanelValues: CandidateQueryPanelValues = {
    occupations: [],
    keywords: [],
    localities: [],
  };

  constructor(private router: Router, private i18nService: I18nService, private occupationSuggestionService: OccupationSuggestionService) {
    super();
  }

  ngOnInit() {
    this.i18nService.currentLanguage$.pipe(
      filter(() => !!this.candidateQueryPanelValues.occupations),
      filter(() => this.candidateQueryPanelValues.occupations.length > 0),
      switchMap((lang) => {
        const occupations: OccupationMultiTypeaheadItem[] = this.candidateQueryPanelValues.occupations;
        return this.occupationSuggestionService.translateAll(occupations, lang);
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((data) => {
      this.candidateQueryPanelValues = {
        ...this.candidateQueryPanelValues,
        occupations: [...data]
      };
    });
  }

  public onSearchSubmit(candidateQueryPanelValues1: CandidateQueryPanelValues) {
    // this.router.navigate(['candidate-search'], {
    //   queryParams: {
    //     'query-values': JSON.stringify(candidateQueryPanelValues1)
    //   }
    // });
  }

}
