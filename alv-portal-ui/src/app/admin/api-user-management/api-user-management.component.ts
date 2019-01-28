import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import {
  ApiUser, ApiUserColumnDefinition,
  ApiUserManagementFilter, initialFilter
} from '../../shared/backend-services/api-user-management/api-user-management.types';
import { ApiUserManagementRepository } from '../../shared/backend-services/api-user-management/api-user-management-repository';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { API_USERS_PER_PAGE, ApiUserManagementRequestMapper } from './api-user-management-request.mapper';
import { map, take } from 'rxjs/operators';
import { FAILURE, mapSortToApiUserColumnDefinition } from './api-user-management-factory';
import { ApiUserEditModalComponent } from './api-user-edit-modal/api-user-edit-modal.component';
import { NotificationsService } from '../../core/notifications.service';

@Component({
  selector: 'alv-api-user-management',
  templateUrl: './api-user-management.component.html',
  styleUrls: ['./api-user-management.component.scss']
})
export class ApiUserManagementComponent implements OnInit {

  form: FormGroup;

  apiUserList$: Observable<ApiUser[]>;

  apiUserFilter$: Observable<ApiUserManagementFilter>;

  currentSorting$: Observable<ApiUserColumnDefinition>;

  page$: Observable<number>;

  private maxScrollPage: number;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationsService,
              private apiUserManagementRepository: ApiUserManagementRepository,
              private modalService: ModalService) { }

  ngOnInit() {
    this.form = this.prepareForm();

    this.apiUserList$ = this.loadApiUsers(initialFilter, 0);
  }

  onFilterChange() {
    this.apiUserFilter$.pipe(take(1)).subscribe((filter) => {
      this.apiUserList$ = this.loadApiUsers({...filter, query: this.form.get('query').value}, 0);
    });
  }

  onSortChange(sort: string) {
    this.apiUserFilter$.pipe(take(1)).subscribe((filter) => {
      this.apiUserList$ = this.loadApiUsers({...filter, sort}, 0);
    });
  }

  onScrollChange(currentPage: number) {
    if (!(currentPage === this.maxScrollPage)) {
      this.apiUserFilter$.pipe(
        take(1))
        .subscribe( (filter) => {
          this.apiUserList$ = combineLatest(this.apiUserList$, this.apiUserManagementRepository.search(
            ApiUserManagementRequestMapper.mapToRequest(filter, currentPage + 1))).pipe(
            map( ([list, response]) => {
              console.log('totalCount', response.totalCount);
              this.maxScrollPage = Math.ceil(response.totalCount / API_USERS_PER_PAGE);
              console.log('...maxScrollPage : ', this.maxScrollPage);
              this.page$ = ((currentPage + 1) > this.maxScrollPage) ? of(this.maxScrollPage) : of(currentPage + 1);
              this.apiUserFilter$ = of(filter);
              this.currentSorting$ = of(mapSortToApiUserColumnDefinition(filter.sort));
              return [...list, ...response.result];
            })
          );
        });
    }
  }

  onStatusChange() {
    this.applyFilter();
  }

  onUpdateUserChange(apiUser: ApiUser) {
    if (apiUser) {
      this.applyFilter();
    }
  }

  onUpdatePasswordChange(apiUserId: string) {
    if (apiUserId) {
      this.applyFilter();
    }
  }

  onCreateUserDialog() {
    const apiUserModalRef = this.modalService.openLarge(ApiUserEditModalComponent);
    const apiUserComponent = <ApiUserEditModalComponent>apiUserModalRef.componentInstance;
    apiUserComponent.apiUser = null;
    apiUserModalRef.result.then(
      (user) => {
        if (user) {
          this.applyFilter();
        }
      },
      () => this.error()
    );
  }

  private applyFilter() {
    this.apiUserFilter$.pipe(take(1)).subscribe((filter) => {
      this.apiUserList$ = this.loadApiUsers(filter, 0);
    });
  }

  private loadApiUsers(filter: ApiUserManagementFilter, page: number): Observable<ApiUser[]> {
    return this.apiUserManagementRepository.search(
      ApiUserManagementRequestMapper.mapToRequest(filter, page)).pipe(
      map((response) => {
        this.maxScrollPage = Math.ceil(response.totalCount / API_USERS_PER_PAGE);
        this.page$ = (page > this.maxScrollPage) ? of(this.maxScrollPage) : of(page);
        this.apiUserFilter$ = of(filter);
        this.currentSorting$ = of(mapSortToApiUserColumnDefinition(filter.sort));
        return response.result;
      }));
  }

  private error() {
    this.notificationService.error(FAILURE);
  }

  private prepareForm() {
    return this.fb.group({
      query: [null]
    });
  }

}
