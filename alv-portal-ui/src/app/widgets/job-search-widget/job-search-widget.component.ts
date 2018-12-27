import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { JobQueryPanelValues } from './job-query-panel/job-query-panel-values';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { OccupationMultiTypeaheadItem } from '../../shared/occupations/occupation-multi-typeahead-item';
import { OccupationSuggestionService } from '../../shared/occupations/occupation-suggestion.service';

@Component({
  selector: 'alv-job-search-widget',
  templateUrl: './job-search-widget.component.html',
  styleUrls: ['./job-search-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobSearchWidgetComponent extends AbstractSubscriber implements OnInit {

  jobQueryPanelValues = {
    occupations: [],
    keywords: [],
    localities: [],
  };

  constructor(private router: Router, private i18nService: I18nService, private occupationSuggestionService: OccupationSuggestionService) {
    super();
  }

  ngOnInit(): void {
    this.i18nService.currentLanguage$.pipe(
      filter(() => !!this.jobQueryPanelValues.occupations),
      filter(() => this.jobQueryPanelValues.occupations.length > 0),
      switchMap((lang) => {
        const occupations: OccupationMultiTypeaheadItem[] = this.jobQueryPanelValues.occupations;
        return this.occupationSuggestionService.translateAll(occupations, lang);
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((data) => {
      this.jobQueryPanelValues = {
        ...this.jobQueryPanelValues,
        occupations: [...data]
      };
    });
  }

  public onSearchSubmit(jobQueryPanelValues: JobQueryPanelValues) {
    this.router.navigate(['job-search'], {
      queryParams: {
        'query-values': JSON.stringify(jobQueryPanelValues)
      }
    });
  }

}
