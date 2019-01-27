import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  ApiUser, ApiUserColumnDefinition,
  ApiUserManagementFilter, initialFilter
} from '../../shared/backend-services/api-user-management/api-user-management.types';
import { ApiUserManagementRepository } from '../../shared/backend-services/api-user-management/api-user-management-repository';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { ApiUserManagementRequestMapper } from './api-user-management-request.mapper';
import { map, take, tap } from 'rxjs/operators';
import { FAILURE, mapSortToApiUserColumnDefinition, SUCCESS } from './api-user-management-factory';
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

  constructor(private fb: FormBuilder,
              private notificationService: NotificationsService,
              private apiUserManagementRepository: ApiUserManagementRepository,
              private modalService: ModalService) { }

  ngOnInit() {
    this.form = this.prepareForm();

    this.apiUserFilter$ = of(initialFilter).pipe(
      tap(filter => {
        this.form.patchValue({query: filter.query}, {emitEvent: false});
        this.currentSorting$ = of(mapSortToApiUserColumnDefinition(filter.sort));
      })
    );

    this.apiUserList$ = this.apiUserManagementRepository.search(
      ApiUserManagementRequestMapper.mapToRequest(initialFilter, 0)).pipe(
      map((response) => {
        return response.result;
      }));
  }

  onFilterChange() {

  }

  onCreateUserDialog() {
    const apiUserModalRef = this.modalService.openLarge(ApiUserEditModalComponent);
    const apiUserComponent = <ApiUserEditModalComponent>apiUserModalRef.componentInstance;
    apiUserComponent.apiUser = null;
    apiUserModalRef.result.then(
      () => {
        this.loadApiUsers();
        this.notificationService.success(SUCCESS);
      },
      () => this.error()
    );
  }

  loadApiUsers() {
    this.apiUserFilter$.pipe(
      take(1)).subscribe(
      (filter) => {
        // this.apiUserList$ = this.apiUserManagementRepository.search(
        //   ApiUserManagementRequestMapper.mapToRequest(filter, 0));
      }
    );
  }

  error() {
    this.notificationService.error(FAILURE);
  }

  private prepareForm() {
    return this.fb.group({
      query: [null]
    });
  }

}
