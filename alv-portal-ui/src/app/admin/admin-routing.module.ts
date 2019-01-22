import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import {SystemNotificationsDashboardComponent} from "./system-notifications-dashboard/system-notifications-dashboard.component";

const routes: Routes = [
  {
    path: 'user-info',
    component: UserInfoComponent,
  },
  {
    path: 'system-notifications-dashboard',
    component: SystemNotificationsDashboardComponent,
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
