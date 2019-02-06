import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  ApiUser,
  ApiUserColumnDefinition,
  ApiUserManagementFilter,
  ApiUserSearchResponse,
  initialFilter
} from '../../shared/backend-services/api-user-management/api-user-management.types';
import { ApiUserManagementRepository } from '../../shared/backend-services/api-user-management/api-user-management-repository';
import { ModalService } from '../../shared/layout/modal/modal.service';
import {
  API_USERS_PER_PAGE, mapSortToApiUserColumnDefinition, mapToRequest,
} from './api-user-management-request.mapper';
import { take, tap } from 'rxjs/operators';
import { ApiUserModalComponent } from './api-user-modal/api-user-modal.component';
import { NotificationsService } from '../../core/notifications.service';

@Component({
  selector: 'alv-api-user-management',
  templateUrl: './api-user-management.component.html',
  styleUrls: ['./api-user-management.component.scss']
})
export class ApiUserManagementComponent implements OnInit {

  form: FormGroup;

  apiUserList: ApiUser[];

  currentFilter: ApiUserManagementFilter;

  currentSorting: ApiUserColumnDefinition;

  page: number;

  private maxScrollPage: number;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationsService,
              private apiUserManagementRepository: ApiUserManagementRepository,
              private modalService: ModalService) { }

  ngOnInit() {
    this.form = this.prepareForm();

    this.loadApiUsers(initialFilter, 0).pipe(
      take(1))
      .subscribe((response) => {
        this.apiUserList = response.result;
      });
  }

  onFilterChange() {
    this.loadApiUsers({ ...this.currentFilter, query: this.form.get('query').value }, 0)
      .subscribe((response) => {
        this.apiUserList = response.result;
      });
  }

  onSortChange(sort: string) {
    this.loadApiUsers({ ...this.currentFilter, sort }, 0)
      .subscribe((response) => {
        this.apiUserList = response.result;
      });
  }

  onScrollChange(nextPage: number) {
    this.loadApiUsers(this.currentFilter, nextPage)
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
    const apiUserModalRef = this.modalService.openLarge(ApiUserModalComponent);
    const apiUserComponent = <ApiUserModalComponent>apiUserModalRef.componentInstance;
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
    return this.loadApiUsers(this.currentFilter, 0)
      .subscribe((response) => {
        this.apiUserList = response.result;
      });
  }

  private loadApiUsers(filter: ApiUserManagementFilter, page: number): Observable<ApiUserSearchResponse> {
    return this.apiUserManagementRepository.search(
      mapToRequest(filter, page)).pipe(
      tap(response => {
        this.setFilter(filter);
        this.setMaxScrollPage(response.totalCount, page);
      }));
  }

  private setFilter(filter: ApiUserManagementFilter) {
    this.currentFilter = filter;
    this.currentSorting = mapSortToApiUserColumnDefinition(filter.sort);
  }

  private setMaxScrollPage(totalCount: number, currentPage: number) {
    this.maxScrollPage = Math.ceil(totalCount / API_USERS_PER_PAGE);
    this.page = currentPage > this.maxScrollPage ? this.maxScrollPage : currentPage;
  }

}
