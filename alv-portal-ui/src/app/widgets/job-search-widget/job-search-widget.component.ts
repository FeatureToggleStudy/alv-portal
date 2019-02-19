import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { JobQueryPanelValues } from './job-query-panel/job-query-panel-values';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { OccupationTypeaheadItem } from '../../shared/occupations/occupation-typeahead-item';
import { OccupationSuggestionService } from '../../shared/occupations/occupation-suggestion.service';
import { IconKey } from '../../shared/icons/custom-icon/custom-icon.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'alv-job-search-widget',
  templateUrl: './job-search-widget.component.html',
  styleUrls: ['./job-search-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobSearchWidgetComponent extends AbstractSubscriber implements OnInit {

  IconKey = IconKey;

  jobQueryPanelValues$: Observable<JobQueryPanelValues>;

  private jobQueryPanelValues = {
    occupations: [],
    keywords: [],
    localities: [],
  };

  constructor(private router: Router,
              private i18nService: I18nService,
              private occupationSuggestionService: OccupationSuggestionService) {
    super();
  }

  ngOnInit(): void {
    this.jobQueryPanelValues$ = this.i18nService.currentLanguage$.pipe(
      filter(() => !!this.jobQueryPanelValues.occupations),
      filter(() => this.jobQueryPanelValues.occupations.length > 0),
      switchMap((lang) => {
        const occupations: OccupationTypeaheadItem[] = this.jobQueryPanelValues.occupations;
        return this.occupationSuggestionService.translateAll(occupations, lang);
      }),
      map((data) => {
        return ({
          ...this.jobQueryPanelValues,
          occupations: [...data]
        });
      }),
      startWith(this.jobQueryPanelValues)
    );
  }

  public jobQueryChanged(jobQueryPanelValues: JobQueryPanelValues) {
    this.jobQueryPanelValues = jobQueryPanelValues;
  }

  public onSearchSubmit(jobQueryPanelValues: JobQueryPanelValues) {
    this.router.navigate(['job-search'], {
      queryParams: {
        'query-values': JSON.stringify(jobQueryPanelValues)
      }
    });
  }

}
