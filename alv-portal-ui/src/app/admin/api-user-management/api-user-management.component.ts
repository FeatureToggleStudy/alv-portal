import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import {
  ApiUser,
  ApiUserColumnDefinition,
  ApiUserManagementFilter, ApiUserSearchResponse,
  initialFilter
} from '../../shared/backend-services/api-user-management/api-user-management.types';
import { ApiUserManagementRepository } from '../../shared/backend-services/api-user-management/api-user-management-repository';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { API_USERS_PER_PAGE, ApiUserManagementRequestMapper } from './api-user-management-request.mapper';
import { flatMap, take, tap } from 'rxjs/operators';
import { mapSortToApiUserColumnDefinition } from './api-user-management-factory';
import { ApiUserEditModalComponent } from './api-user-edit-modal/api-user-edit-modal.component';
import { NotificationsService } from '../../core/notifications.service';

@Component({
  selector: 'alv-api-user-management',
  templateUrl: './api-user-management.component.html',
  styleUrls: ['./api-user-management.component.scss']
})
export class ApiUserManagementComponent implements OnInit {

  form: FormGroup;

  apiUserList$ = new Subject<ApiUser[]>();

  apiUserListBeforeScrolling: ApiUser[];

  currentFilter$: Observable<ApiUserManagementFilter>;

  currentSorting$: Observable<ApiUserColumnDefinition>;

  page: number;

  private maxScrollPage: number;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationsService,
              private apiUserManagementRepository: ApiUserManagementRepository,
              private modalService: ModalService) { }

  ngOnInit() {
    this.form = this.prepareForm();

    this.loadApiUsers(initialFilter, 0);
  }

  onFilterChange() {
    this.currentFilter$.pipe(
      take(1))
      .subscribe((filter) => {
      this.loadApiUsers({...filter, query: this.form.get('query').value}, 0);
    });
  }

  onSortChange(sort: string) {
    this.currentFilter$.pipe(take(1)).subscribe((filter) => {
      this.loadApiUsers({...filter, sort}, 0);
    });
  }

  onScrollChange(nextPage: number) {
    if (nextPage === this.maxScrollPage) {
      return;
    }
    this.currentFilter$.pipe(
      take(1),
      flatMap((filter) => {
        return this.addApiUsers(filter, nextPage);
      }))
      .subscribe();
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
      () => {}
    );
  }

  private prepareForm() {
    return this.fb.group({
      query: [null]
    });
  }

  private applyFilter() {
    this.currentFilter$.pipe(take(1))
      .subscribe((filter) => {
        this.loadApiUsers(filter, 0);
      });
  }

  private addApiUsers(filter: ApiUserManagementFilter, page: number): Observable<ApiUserSearchResponse> {
    return this.apiUserManagementRepository.search(
      ApiUserManagementRequestMapper.mapToRequest(filter, page)).pipe(
      tap(response => {
        this.apiUserList$.next([...this.apiUserListBeforeScrolling, ...response.result]);
        this.apiUserListBeforeScrolling = [...this.apiUserListBeforeScrolling, ...response.result];
        this.setFilter(filter);
        this.setMaxScrollPage(response.totalCount, page);
      }));
  }

  private loadApiUsers(filter: ApiUserManagementFilter, page: number): void {
    this.apiUserManagementRepository.search(
      ApiUserManagementRequestMapper.mapToRequest(filter, page))
      .subscribe(response => {
        this.apiUserList$.next(response.result);
        this.apiUserListBeforeScrolling = response.result;
        this.setFilter(filter);
        this.setMaxScrollPage(response.totalCount, page);
      });
  }

  private setFilter(filter: ApiUserManagementFilter) {
    this.currentFilter$ = of(filter);
    this.currentSorting$ = of(mapSortToApiUserColumnDefinition(filter.sort));
  }

  private setMaxScrollPage(totalCount: number, currentPage: number) {
    this.maxScrollPage = Math.ceil(totalCount / API_USERS_PER_PAGE);
    this.page = currentPage > this.maxScrollPage ? this.maxScrollPage : currentPage;
  }

}
