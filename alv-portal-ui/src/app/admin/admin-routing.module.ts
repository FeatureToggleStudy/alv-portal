import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { ApiUserManagementComponent } from './api-user-management/api-user-management.component';

const routes: Routes = [
  {
    path: 'user-info',
    component: UserInfoComponent,
  },
  {
    path: 'api-user-management',
    component: ApiUserManagementComponent,
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
