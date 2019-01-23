import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UserInfoComponent} from './user-info/user-info.component';
import {SystemNotificationsComponent} from './system-notifications/system-notifications.component';

const routes: Routes = [
  {
    path: 'user-info',
    component: UserInfoComponent,
  },
  {
    path: 'system-notifications-dashboard',
    component: SystemNotificationsComponent,
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
