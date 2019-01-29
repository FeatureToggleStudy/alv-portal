import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { ApiUserManagementComponent } from './api-user-management/api-user-management.component';
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
    path: 'api-user-management',
    component: ApiUserManagementComponent,
    data: {
      titleKey: 'portal.admin.api-user-management.title',
      authorities: [UserRole.ROLE_SYSADMIN]
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
