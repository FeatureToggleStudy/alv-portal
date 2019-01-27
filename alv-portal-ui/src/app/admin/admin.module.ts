import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInfoBadgesMapperService } from './user-info/user-info-badges-mapper.service';
import { ApiUserManagementComponent } from './api-user-management/api-user-management.component';
import { ApiUserEditModalComponent } from './api-user-management/api-user-edit-modal/api-user-edit-modal.component';
import { ApiUserPasswordModalComponent } from './api-user-management/api-user-password-modal/api-user-password-modal.component';
import { ModalService } from '../shared/layout/modal/modal.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ApiUserManagementTableComponent } from './api-user-management/api-user-management-table/api-user-management-table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [
    UserInfoComponent,
    ApiUserManagementComponent,
    ApiUserEditModalComponent,
    ApiUserPasswordModalComponent,
    ApiUserManagementTableComponent
  ],
  providers: [
    UserInfoBadgesMapperService,
    ModalService
  ],
  entryComponents: [
    ApiUserEditModalComponent,
    ApiUserPasswordModalComponent
  ]
})
export class AdminModule {
}
