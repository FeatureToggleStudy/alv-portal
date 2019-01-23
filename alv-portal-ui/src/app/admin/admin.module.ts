import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserInfoBadgesMapperService} from './user-info/user-info-badges-mapper.service';
import {SystemNotificationsComponent} from './system-notifications/system-notifications.component';
import {SystemNotificationEditModalComponent} from './system-notifications/edit-modal/system-notification-edit-modal.component';
import {SystemNotificationDeleteModalComponent} from './system-notifications/delete-modal/system-notification-delete-modal.component';
import {SystemNotificationCreateModalComponent} from './system-notifications/create-modal/system-notification-create-modal.component';
import {ModalService} from '../shared/layout/modal/modal.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    UserInfoComponent,
    SystemNotificationsComponent,
    SystemNotificationEditModalComponent,
    SystemNotificationDeleteModalComponent,
    SystemNotificationCreateModalComponent
  ],
  providers: [
    UserInfoBadgesMapperService,
    ModalService
  ],
  entryComponents: [
    SystemNotificationEditModalComponent,
    SystemNotificationDeleteModalComponent,
    SystemNotificationCreateModalComponent
  ]
})
export class AdminModule {
}
