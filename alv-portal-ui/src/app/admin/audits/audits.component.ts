import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditsRepository } from '../../shared/backend-services/audits/audits-repository';
import {
  Audit,
  AUDITS_ITEMS_PER_PAGE,
  AuditsColumnDefinition,
  AuditsFilter,
  AuditsSearchResponse
} from '../../shared/backend-services/audits/audits.types';
import { now, toISOLocalDate, tomorrow } from '../../shared/forms/input/ngb-date-utils';
import { initAuditsFilter, mapAuditsToRequest, mapSortToAuditsColumnDefinition } from './audits-request.mapper';
import { flatMap, map, take, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AbstractSubscriber } from '../../core/abstract-subscriber';

@Component({
  selector: 'alv-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.scss']
})
export class AuditsComponent extends AbstractSubscriber implements OnInit {

  form: FormGroup;

  auditList: Audit[];

  currentFilter: AuditsFilter;

  currentSorting: AuditsColumnDefinition;

  page: number;

  private maxScrollPage: number;


  constructor(private fb: FormBuilder,
              private auditsRepository: AuditsRepository) {
    super();
  }

  ngOnInit() {
    this.form = this.prepareForm();

    this.loadAudits(initAuditsFilter, 0)
      .pipe(take(1))
      .subscribe((response) => {
        this.auditList = response.result;
        this.setFilter(initAuditsFilter);
        this.setMaxScrollPage(response.totalCount, 0);
      });

    this.form.valueChanges
      .pipe(
        map<any, AuditsFilter>((formValues) => {
          this.currentFilter = this.mapFilterValues(formValues);
          return this.currentFilter;
        }),
        flatMap((filter) => this.loadAudits(filter, this.page)),
        takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.auditList = response.result;
        this.setMaxScrollPage(response.totalCount, this.page);
      });
  }

  onSortChange(sort: string) {
    this.setFilter({...this.currentFilter, sort});
    this.loadAudits(this.currentFilter, 0)
      .subscribe((response) => {
        this.auditList = response.result;
        this.setMaxScrollPage(response.totalCount, this.page);
      });
  }

  onScrollChange(nextPage: number) {
    this.loadAudits(this.currentFilter, nextPage)
      .subscribe((response) => {
        this.auditList = [...this.auditList, ...response.result];
        this.setMaxScrollPage(response.totalCount, this.page);
      });
  }

  private loadAudits(filter: AuditsFilter, page: number): Observable<AuditsSearchResponse> {
    return this.auditsRepository.query(mapAuditsToRequest(filter, page));
  }

  private mapFilterValues(formValues: any): AuditsFilter {
    return {
      fromDate: toISOLocalDate(formValues.from),
      toDate: toISOLocalDate(formValues.to),
      sort: this.currentFilter.sort
    };
  }

  private setFilter(filter: AuditsFilter) {
    this.currentFilter = filter;
    this.currentSorting = mapSortToAuditsColumnDefinition(filter.sort);
  }

  private setMaxScrollPage(totalCount: number, currentPage: number) {
    this.maxScrollPage = Math.ceil(totalCount / AUDITS_ITEMS_PER_PAGE);
    this.page = currentPage > this.maxScrollPage ? this.maxScrollPage : currentPage;
  }

  private prepareForm() {
    return this.fb.group({
      from: [now(), Validators.required],
      to: [tomorrow(), Validators.required]
    });
  }

}
