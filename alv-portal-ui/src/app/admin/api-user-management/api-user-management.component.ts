import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import {
  ApiUser,
  ApiUserColumnDefinition,
  ApiUserManagementFilter,
  initialFilter
} from '../../shared/backend-services/api-user-management/api-user-management.types';
import { ApiUserManagementRepository } from '../../shared/backend-services/api-user-management/api-user-management-repository';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { API_USERS_PER_PAGE, ApiUserManagementRequestMapper } from './api-user-management-request.mapper';
import { take, withLatestFrom } from 'rxjs/operators';
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

  apiUserList$ = new Subject<ApiUser[]>();

  array$: Observable<ApiUser[]>;

  currentFilter$: Observable<ApiUserManagementFilter>;

  currentSorting$: Observable<ApiUserColumnDefinition>;

  page$: Observable<number>;

  private maxScrollPage: number;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationsService,
              private apiUserManagementRepository: ApiUserManagementRepository,
              private modalService: ModalService) { }

  ngOnInit() {
    this.form = this.prepareForm();

    this.loadApiUsers(initialFilter, 0, []);
  }

  onFilterChange() {
    this.currentFilter$.pipe(take(1)).subscribe((filter) => {
      this.loadApiUsers({...filter, query: this.form.get('query').value}, 0, []);
    });
  }

  onSortChange(sort: string) {
    this.currentFilter$.pipe(take(1)).subscribe((filter) => {
      this.loadApiUsers({...filter, sort}, 0, []);
    });
  }

  onScrollChange(nextPage: number) {

    if (nextPage === this.maxScrollPage) {
      return;
    }

    this.currentFilter$.pipe(take(1),
      withLatestFrom(this.array$))
      .subscribe(([filter, list]) => {
        this.loadApiUsers(filter, nextPage, list);
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
      () => this.error()
    );
  }

  private applyFilter() {
    this.currentFilter$.pipe(take(1))
      .subscribe((filter) => {
        this.loadApiUsers(filter, 0, []);
      });
  }

  private loadApiUsers(filter: ApiUserManagementFilter, page: number, existingList: ApiUser[]): void {
    this.apiUserManagementRepository.search(
      ApiUserManagementRequestMapper.mapToRequest(filter, page))
      .subscribe(response => {
        this.apiUserList$.next([...existingList, ...response.result]);
        this.array$ = of([...existingList, ...response.result]);
        this.currentFilter$ = of(filter);
        this.currentSorting$ = of(mapSortToApiUserColumnDefinition(filter.sort));
        this.setMaxScrollPage(response.totalCount, page);
      });
  }

  private setMaxScrollPage(totalCount: number, currentPage: number) {
    this.maxScrollPage = Math.ceil(totalCount / API_USERS_PER_PAGE);
    this.page$ = of(currentPage > this.maxScrollPage ? this.maxScrollPage : currentPage);
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
