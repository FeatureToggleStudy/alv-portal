import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { LegalTermsManagementComponent } from './legal-terms-management/legal-terms-management.component';
import { ApiUserManagementComponent } from './api-user-management/api-user-management.component';
import { UserRole } from '../core/auth/user.model';
import { SystemNotificationsComponent } from './system-notifications/system-notifications.component';
import { ApiDocComponent } from './api-doc/api-doc.component';
import { ElasticSearchReindexComponent } from './elastic-search-reindex/elastic-search-reindex.component';

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
    path: 'blacklist',
    component: BlacklistComponent,
    data: {
      titleKey: 'blacklisted-agent.title',
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
    },
  },
  {
    path: 'api-user-management',
    component: ApiUserManagementComponent,
    data: {
      titleKey: 'portal.admin.api-user-management.title'
    }
  },
  {
    path: 'api-doc',
    component: ApiDocComponent,
    data: {
      titleKey: 'portal.admin.api-doc.title',
    }
  },
  {
    path: 'elastic-search-reindex',
    component: ElasticSearchReindexComponent,
    data: {
      titleKey: 'portal.admin.elastic-search-reindex.title'
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
