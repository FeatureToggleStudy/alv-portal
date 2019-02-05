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
import { flatMap, map, take, takeUntil, tap } from 'rxjs/operators';
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
      });

    this.form.valueChanges
      .pipe(
        map<any, AuditsFilter>((formValues) => this.mapFilterValues(formValues)),
        flatMap((filter) => this.loadAudits(filter, this.page)),
        takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.auditList = response.result;
      });
  }

  onSortChange(sort: string) {
    this.loadAudits({...this.currentFilter, sort}, 0)
      .subscribe((response) => {
        this.auditList = response.result;
      });
  }

  onScrollChange(nextPage: number) {
    this.loadAudits(this.currentFilter, nextPage)
      .subscribe((response) => {
        this.auditList = [...this.auditList, ...response.result];
      });
  }

  private loadAudits(filter: AuditsFilter, page: number): Observable<AuditsSearchResponse> {
    return this.auditsRepository.query(
      mapAuditsToRequest(filter, page)).pipe(
      tap((response) => {
        this.setFilter(filter);
        this.setMaxScrollPage(response.totalCount, page);
      }));
  }

  private mapFilterValues(formValues: any): AuditsFilter {
    return {
      ...this.currentFilter,
      fromDate: toISOLocalDate(formValues.from),
      toDate: toISOLocalDate(formValues.to)
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
