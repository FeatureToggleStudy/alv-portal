import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  ApiUser,
  ApiUserColumnDefinition,
  ApiUserManagementFilter, ApiUserSearchResponse,
  initialFilter
} from '../../shared/backend-services/api-user-management/api-user-management.types';
import { ApiUserManagementRepository } from '../../shared/backend-services/api-user-management/api-user-management-repository';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { API_USERS_PER_PAGE, ApiUserManagementRequestMapper } from './api-user-management-request.mapper';
import { flatMap, take, takeUntil, tap } from 'rxjs/operators';
import { mapSortToApiUserColumnDefinition } from './api-user-management-factory';
import { ApiUserEditModalComponent } from './api-user-edit-modal/api-user-edit-modal.component';
import { NotificationsService } from '../../core/notifications.service';
import { AbstractSubscriber } from '../../core/abstract-subscriber';

@Component({
  selector: 'alv-api-user-management',
  templateUrl: './api-user-management.component.html',
  styleUrls: ['./api-user-management.component.scss']
})
export class ApiUserManagementComponent extends AbstractSubscriber implements OnInit {

  form: FormGroup;

  apiUserList: ApiUser[];

  currentFilter$: Observable<ApiUserManagementFilter>;

  currentSorting$: Observable<ApiUserColumnDefinition>;

  page: number;

  private maxScrollPage: number;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationsService,
              private apiUserManagementRepository: ApiUserManagementRepository,
              private modalService: ModalService) {
    super();
  }

  ngOnInit() {
    this.form = this.prepareForm();

    this.loadApiUsers(initialFilter, 0)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.apiUserList = response.result
      });
  }

  onFilterChange() {
    this.currentFilter$.pipe(
      take(1),
      flatMap((filter) => {
        return this.loadApiUsers({...filter, query: this.form.get('query').value}, 0);
      }),
      takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.apiUserList = response.result
      });
  }

  onSortChange(sort: string) {
    this.currentFilter$.pipe(
      take(1),
      flatMap((filter) => {
        return this.loadApiUsers({...filter, sort}, 0);
      }),
      takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.apiUserList = response.result
      });
  }

  onScrollChange(nextPage: number) {
    if (nextPage === this.maxScrollPage) {
      return;
    }
    this.currentFilter$.pipe(
      take(1),
      flatMap((filter) => {
        return this.loadApiUsers(filter, nextPage);
      }),
      takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.apiUserList = [...this.apiUserList, ...response.result];
      });
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
    this.currentFilter$.pipe(
      take(1),
      flatMap((filter) => {
        return this.loadApiUsers(filter, 0);
      }),
      takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.apiUserList = response.result
      });
  }

  private loadApiUsers(filter: ApiUserManagementFilter, page: number): Observable<ApiUserSearchResponse> {
    return this.apiUserManagementRepository.search(
      ApiUserManagementRequestMapper.mapToRequest(filter, page)).pipe(
      tap(response => {
        this.setFilter(filter);
        this.setMaxScrollPage(response.totalCount, page);
      }));
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
