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

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    UserInfoComponent,
    BlacklistComponent,
    SystemNotificationsComponent,
    SystemNotificationModalComponent,
    LegalTermsManagementComponent,
    LegalTermsDetailModalComponent,
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
    AddBlacklistEntryModalComponent
  ]
})
export class AdminModule {
}
