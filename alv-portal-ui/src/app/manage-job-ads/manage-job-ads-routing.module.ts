import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManageJobAdSearchComponent } from './manage-job-ad-search/manage-job-ad-search.component';
import { ManagedJobAdSearchGuard } from './manage-job-ad-search/managed-job-ad-search.guard';


const routes: Routes = [
  {
    path: '',
    component: ManageJobAdSearchComponent,
    canActivate: [ManagedJobAdSearchGuard],
    //data: { titleKey: 'portal.job-ad-search.browser-title' }
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
