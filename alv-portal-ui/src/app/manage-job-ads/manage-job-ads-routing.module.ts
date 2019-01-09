import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManageJobAdSearchComponent } from './manage-job-ad-search/manage-job-ad-search.component';


const routes: Routes = [
  {
    path: '',
    component: ManageJobAdSearchComponent,
    //canActivate: [ManagedJobAdSearchGuard],
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
