import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { LegalTermsManagementComponent } from './legal-terms-management/legal-terms-management.component';

const routes: Routes = [
  {
    path: 'user-info',
    component: UserInfoComponent,
  },
  {
    path: 'legal-terms-management',
    component: LegalTermsManagementComponent,
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
