import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInfoBadgesMapperService } from './user-info/user-info-badges-mapper.service';
import { LegalTermsManagementComponent } from './legal-terms-management/legal-terms-management.component';
import { LegalTermsDetailModalComponent } from './legal-terms-management/legal-terms-detail-modal/legal-terms-detail-modal.component';
import { ModalService } from '../shared/layout/modal/modal.service';
import { NotificationsService } from '../core/notifications.service';
import { SystemNotificationsComponent } from './system-notifications/system-notifications.component';
import { SystemNotificationModalComponent } from './system-notifications/modal/system-notification-modal.component';
import { SwaggerComponent } from './swagger/swagger.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    UserInfoComponent,
    SystemNotificationsComponent,
    SystemNotificationModalComponent,
    LegalTermsManagementComponent,
    LegalTermsDetailModalComponent,
    SwaggerComponent
  ],
  providers: [
    UserInfoBadgesMapperService,
    NotificationsService,
    ModalService
  ],
  entryComponents: [
    SystemNotificationModalComponent,
    LegalTermsDetailModalComponent,
    SwaggerComponent
  ]
})
export class AdminModule {
}
