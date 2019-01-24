import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { SystemNotificationsComponent } from './system-notifications/system-notifications.component';
import { UserRole } from '../core/auth/user.model';

const routes: Routes = [
  {
    path: 'user-info',
    component: UserInfoComponent,
    data: {
      titleKey: 'portal.admin.user-info.user-info.title',
      authorities: [UserRole.ROLE_SYSADMIN, UserRole.ROLE_ADMIN]
    }
  },
  {
    path: 'system-notifications',
    component: SystemNotificationsComponent,
    data: {
      titleKey: 'portal.admin.system-notifications.title-key'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {

}
