import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserInfoBadgesMapperService} from './user-info/user-info-badges-mapper.service';
import {SystemNotificationsDashboardComponent} from "./system-notifications-dashboard/system-notifications-dashboard.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    UserInfoComponent,
    SystemNotificationsDashboardComponent,
  ],
  providers: [
    UserInfoBadgesMapperService
  ],
  entryComponents: [
  ]
})
export class AdminModule {
}
