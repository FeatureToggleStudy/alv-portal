import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInfoBadgesMapperService } from './user-info/user-info-badges-mapper.service';
import { SystemNotificationsComponent } from './system-notifications/system-notifications.component';
import { ModalService } from '../shared/layout/modal/modal.service';
import { SystemNotificationModalComponent } from './system-notifications/modal/system-notification-modal.component';

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
  ],
  providers: [
    UserInfoBadgesMapperService,
    ModalService
  ],
  entryComponents: [
    SystemNotificationModalComponent,
  ]
})
export class AdminModule {
}
