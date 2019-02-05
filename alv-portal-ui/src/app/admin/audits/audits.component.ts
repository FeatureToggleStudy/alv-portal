import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditsRepository } from '../../shared/backend-services/audits/audits-repository';
import { Audit, AuditsColumnDefinition, AuditsFilter } from '../../shared/backend-services/audits/audits.types';
import { now, tomorrow } from '../../shared/forms/input/ngb-date-utils';
import { API_USERS_PER_PAGE } from '../api-user-management/api-user-management-request.mapper';

@Component({
  selector: 'alv-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.scss']
})
export class AuditsComponent implements OnInit {

  form: FormGroup;

  auditList: Audit[];

  currentFilter: AuditsFilter;

  currentSorting: AuditsColumnDefinition;

  page: number;

  private maxScrollPage: number;


  constructor(private fb: FormBuilder,
              private auditsRepository: AuditsRepository) { }

  ngOnInit() {
    this.form = this.prepareForm();

      this.auditsRepository.query({
        page: 0,
        size: 20,
        fromDate: '2019-02-01',
        toDate: '2019-02-05',
        sort: 'auditEventDate,desc'
      }).subscribe((res) => {
        this.auditList = res;
        // this.maxScrollPage = +res.headers.get('X-Total-Count');
      });

    // this.auditsRepository.query(AuditsRequestMapper.mapToInitialRequest())
    //   // .pipe(take(1))
    //   .subscribe((response) => {
    //     this.auditList = response.body;
    //   });

  // this.form.valueChanges.pipe(
  //     map<any, FilterPanelValues>((valueChanges) => this.map(valueChanges)),
  //     takeUntil(this.ngUnsubscribe)
  // )
  //     .subscribe(filterPanelData => this.filterPanelValuesChange.next(filterPanelData));
  }

  onFilterChange() {
    console.log('onFilterChange');
  }

  onSortChange(sort: string) {
    console.log('sort : ', sort);
  }

  onScrollChange(nextPage: number) {
    if (nextPage === this.maxScrollPage) {
      console.log('nextPage : ', nextPage);
      console.log('maxPage : ', this.maxScrollPage);
      return;
    }

    console.log('scroll', nextPage)
  }

  // private loadApiUsers(filter: AuditsFilter, page: number): Observable<AuditsSearchResponse> {
  //   return this.auditsRepository.query(
  //     AuditsRequestMapper.mapToRequest(filter, page)).pipe(
  //     tap(response => {
  //       this.setMaxScrollPage(response.totalCount, page);
  //     }));
  // }

  private setMaxScrollPage(totalCount: number, currentPage: number) {
    this.maxScrollPage = Math.ceil(totalCount / API_USERS_PER_PAGE);
    this.page = currentPage > this.maxScrollPage ? this.maxScrollPage : currentPage;
  }

  private prepareForm() {
    return this.fb.group({
      from: [now(), Validators.required],
      to: [tomorrow(), Validators.required]
    });
  }

}
