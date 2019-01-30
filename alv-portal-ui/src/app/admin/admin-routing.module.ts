import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { LegalTermsManagementComponent } from './legal-terms-management/legal-terms-management.component';
import { UserRole } from '../core/auth/user.model';
import { SystemNotificationsComponent } from './system-notifications/system-notifications.component';

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
      titleKey: 'portal.admin.system-notifications.page-title'
    }
  },
  {
    path: 'legal-terms-management',
    component: LegalTermsManagementComponent,
    data: {
      titleKey: 'portal.admin.legal-terms-management.title',
      authorities: [UserRole.ROLE_SYSADMIN, UserRole.ROLE_ADMIN]
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
