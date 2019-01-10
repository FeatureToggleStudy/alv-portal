import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManageJobAdSearchComponent } from './manage-job-ad-search/manage-job-ad-search.component';
import { ManagedJobAdSearchGuard } from './manage-job-ad-search/managed-job-ad-search.guard';
import { HasAnyAuthoritiesGuard } from '../core/auth/has-any-authorities-guard.service';
import { UserRole } from '../core/auth/user.model';


const routes: Routes = [
  {
    path: '',
    component: ManageJobAdSearchComponent,
    canActivate: [HasAnyAuthoritiesGuard, ManagedJobAdSearchGuard],
    data: {
      titleKey: 'portal.job-ad-search.browser-title',
      authorities: [UserRole.ROLE_PAV, UserRole.ROLE_COMPANY]
    }
  },
  {
    path: '**',
    redirectTo: ''
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
export class ManageJobAdsRoutingModule {
}
