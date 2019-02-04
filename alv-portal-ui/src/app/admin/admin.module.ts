import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInfoBadgesMapperService } from './user-info/user-info-badges-mapper.service';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { AddBlacklistEntryModalComponent } from './blacklist/add-blacklist-entry-modal/add-blacklist-entry-modal.component';
import { ModalService } from '../shared/layout/modal/modal.service';
import { LegalTermsManagementComponent } from './legal-terms-management/legal-terms-management.component';
import { LegalTermsDetailModalComponent } from './legal-terms-management/legal-terms-detail-modal/legal-terms-detail-modal.component';
import { NotificationsService } from '../core/notifications.service';
import { SystemNotificationsComponent } from './system-notifications/system-notifications.component';
import { SystemNotificationModalComponent } from './system-notifications/modal/system-notification-modal.component';
import { ApiDocComponent } from './api-doc/api-doc.component';
import { ApiUserManagementComponent } from './api-user-management/api-user-management.component';
import { ApiUserModalComponent } from './api-user-management/api-user-modal/api-user-modal.component';
import { ApiUserPasswordModalComponent } from './api-user-management/api-user-password-modal/api-user-password-modal.component';
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
    BlacklistComponent,
    SystemNotificationsComponent,
    SystemNotificationModalComponent,
    LegalTermsManagementComponent,
    LegalTermsDetailModalComponent,
    ApiDocComponent,
    LegalTermsDetailModalComponent,
    ApiUserManagementComponent,
    ApiUserModalComponent,
    ApiUserPasswordModalComponent,
    ApiUserManagementTableComponent,
    AddBlacklistEntryModalComponent
  ],
  providers: [
    UserInfoBadgesMapperService,
    NotificationsService,
    ModalService
  ],
  entryComponents: [
    SystemNotificationModalComponent,
    LegalTermsDetailModalComponent,
    ApiDocComponent,
    LegalTermsDetailModalComponent,
    ApiUserModalComponent,
    ApiUserPasswordModalComponent,
    AddBlacklistEntryModalComponent
  ]
})
export class AdminModule {
}
